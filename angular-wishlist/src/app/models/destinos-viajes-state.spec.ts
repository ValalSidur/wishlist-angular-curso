import{
    reducerDestinosViajes,
    DestinosViajesState,
    initialzeDestinosViajesState,
    InitMyDataAction,
    NuevoDestinoAction
} from './destinos-viajes-state';
import { DestinoViaje } from './destino-viaje';
import { DestinosApiClient } from './destinos-api-client';

describe('reducerDestinosViajes',() => {
    it('should reduce init data', () => {
        //setup
        const prevState: DestinosViajesState = initialzeDestinosViajesState();
        const action: InitMyDataAction = new InitMyDataAction(['destino 1','destino 2']);
        
        //Action
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        
        //assertions
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].nombre).toEqual('destino 1');

        //Se ejecuta con el comando ng test
    });

    it('should reduce new item added', () => {
        const prevState: DestinosViajesState = initialzeDestinosViajesState();
        const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona','url'));
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].nombre).toEqual('barcelona');
    });
});


