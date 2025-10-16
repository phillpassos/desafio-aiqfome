
CREATE TABLE clientes (
    id SERIAL NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);

CREATE TABLE favoritos (
    id SERIAL NOT NULL,
    id_cliente integer NOT NULL,
    id_produto_externo integer NOT NULL
);

ALTER TABLE ONLY clientes
    ADD CONSTRAINT clientes_email_key UNIQUE (email);

ALTER TABLE ONLY clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY favoritos
    ADD CONSTRAINT favoritos_id_cliente_id_produto_externo_key UNIQUE (id_cliente, id_produto_externo);

ALTER TABLE ONLY favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id);

CREATE INDEX email_idx ON clientes USING btree (email);

ALTER TABLE ONLY favoritos
    ADD CONSTRAINT favoritos_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE NOT VALID;