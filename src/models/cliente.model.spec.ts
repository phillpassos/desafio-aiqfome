import ClienteModel from "./cliente.model";

describe('clienteModel', () => {
    it('Deve verificar corretamente o email valido', () => {
        const cliente = new ClienteModel({nome: 'Teste', email: 'asdjfajksdf@bla.com'});
        expect(cliente.validateEmail()).toBeTruthy();
    });

    it('Deve verificar corretamente o email INvalido', () => {
        const cliente = new ClienteModel({nome: 'Teste', email: 'asdjfajksdf@bla'});
        expect(cliente.validateEmail()).toBeFalsy();
    });
});