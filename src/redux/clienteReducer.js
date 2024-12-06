import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { alterarCliente, consultarCliente, excluirCliente, gravarCliente } from "../servicos/servicoCliente";
import ESTADO from "./estados";

export const apagarCliente = createAsyncThunk('apagarCliente', async (cliente) => {
    const resultado = await excluirCliente(cliente);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            cliente
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

export const atualizarCliente = createAsyncThunk('atualizarCliente', async (cliente) => {
    const resultado = await alterarCliente(cliente);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            cliente
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

export const buscarClientes = createAsyncThunk('buscarClientes', async () => {
    const resultado = await consultarCliente();
    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Clientes recuperadas com sucesso",
                "listaDeClientes": resultado
            };
        } else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os clientes do backend",
                "listaDeClientes": []
            }
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem,
            "listaDeClientes": []
        };
    };
});

export const incluirCliente = createAsyncThunk('incluirCliente', async (cliente) => {
    const resultado = await gravarCliente(cliente);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            cliente
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

const clienteReducer = createSlice({
    name: 'cliente',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeClientes: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarClientes.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Buscando clientes)";
            })
            .addCase(buscarClientes.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeClientes = action.payload.listaDeClientes;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarClientes.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(apagarCliente.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Excluindo cliente)";
            })
            .addCase(apagarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeClientes = state.listaDeClientes.filter((cliente) =>
                        cliente.codigo !== action.payload.cliente.codigo
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(apagarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(incluirCliente.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Incluindo cliente)";
            })
            .addCase(incluirCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeClientes.push(action.payload.cliente);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(atualizarCliente.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Atualizando cliente)";
            })
            .addCase(atualizarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const i = state.listaDeClientes.findIndex((cliente) => cliente.codigo === action.payload.cliente.codigo);
                    state.listaDeClientes[i] = action.payload.cliente;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default clienteReducer.reducer;