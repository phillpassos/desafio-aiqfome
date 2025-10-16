--
-- PostgreSQL database dump
--

\restrict V1MLBtVXoW4zuMIZvDaE4PrrRhcSSG0CaAIQzjTcgCGm6t8ZdlC6eh19ApHtvRq

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.6

-- Started on 2025-10-16 14:15:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 18297)
-- Name: aiqfome; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA aiqfome;


ALTER SCHEMA aiqfome OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 18299)
-- Name: clientes; Type: TABLE; Schema: aiqfome; Owner: postgres
--

CREATE TABLE aiqfome.clientes (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE aiqfome.clientes OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 18298)
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: aiqfome; Owner: postgres
--

CREATE SEQUENCE aiqfome.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiqfome.clientes_id_seq OWNER TO postgres;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 218
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: aiqfome; Owner: postgres
--

ALTER SEQUENCE aiqfome.clientes_id_seq OWNED BY aiqfome.clientes.id;


--
-- TOC entry 221 (class 1259 OID 18310)
-- Name: favoritos; Type: TABLE; Schema: aiqfome; Owner: postgres
--

CREATE TABLE aiqfome.favoritos (
    id integer NOT NULL,
    id_cliente integer NOT NULL,
    id_produto_externo integer NOT NULL
);


ALTER TABLE aiqfome.favoritos OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18309)
-- Name: favoritos_id_seq; Type: SEQUENCE; Schema: aiqfome; Owner: postgres
--

CREATE SEQUENCE aiqfome.favoritos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE aiqfome.favoritos_id_seq OWNER TO postgres;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 220
-- Name: favoritos_id_seq; Type: SEQUENCE OWNED BY; Schema: aiqfome; Owner: postgres
--

ALTER SEQUENCE aiqfome.favoritos_id_seq OWNED BY aiqfome.favoritos.id;


--
-- TOC entry 3216 (class 2604 OID 18302)
-- Name: clientes id; Type: DEFAULT; Schema: aiqfome; Owner: postgres
--

ALTER TABLE ONLY aiqfome.clientes ALTER COLUMN id SET DEFAULT nextval('aiqfome.clientes_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 18328)
-- Name: favoritos id; Type: DEFAULT; Schema: aiqfome; Owner: postgres
--

ALTER TABLE ONLY aiqfome.favoritos ALTER COLUMN id SET DEFAULT nextval('aiqfome.favoritos_id_seq'::regclass);


--
-- TOC entry 3219 (class 2606 OID 18308)
-- Name: clientes clientes_email_key; Type: CONSTRAINT; Schema: aiqfome; Owner: postgres
--

ALTER TABLE ONLY aiqfome.clientes
    ADD CONSTRAINT clientes_email_key UNIQUE (email);


--
-- TOC entry 3221 (class 2606 OID 18306)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: aiqfome; Owner: postgres
--

ALTER TABLE ONLY aiqfome.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- TOC entry 3224 (class 2606 OID 18317)
-- Name: favoritos favoritos_id_cliente_id_produto_externo_key; Type: CONSTRAINT; Schema: aiqfome; Owner: postgres
--

ALTER TABLE ONLY aiqfome.favoritos
    ADD CONSTRAINT favoritos_id_cliente_id_produto_externo_key UNIQUE (id_cliente, id_produto_externo);


--
-- TOC entry 3226 (class 2606 OID 18330)
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: aiqfome; Owner: postgres
--

ALTER TABLE ONLY aiqfome.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id);


--
-- TOC entry 3222 (class 1259 OID 18336)
-- Name: email_idx; Type: INDEX; Schema: aiqfome; Owner: postgres
--

CREATE INDEX email_idx ON aiqfome.clientes USING btree (email);


--
-- TOC entry 3227 (class 2606 OID 18323)
-- Name: favoritos favoritos_id_cliente_fkey; Type: FK CONSTRAINT; Schema: aiqfome; Owner: postgres
--

ALTER TABLE ONLY aiqfome.favoritos
    ADD CONSTRAINT favoritos_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES aiqfome.clientes(id) ON DELETE CASCADE NOT VALID;


-- Completed on 2025-10-16 14:15:45

--
-- PostgreSQL database dump complete
--

\unrestrict V1MLBtVXoW4zuMIZvDaE4PrrRhcSSG0CaAIQzjTcgCGm6t8ZdlC6eh19ApHtvRq

