--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-08-03 13:20:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 135274)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 846 (class 1247 OID 135285)
-- Name: ProductCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProductCategory" AS ENUM (
    'MINUMAN',
    'MAKANAN',
    'PROMO'
);


ALTER TYPE public."ProductCategory" OWNER TO postgres;

--
-- TOC entry 849 (class 1247 OID 135292)
-- Name: Variant; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Variant" AS ENUM (
    'DINGIN',
    'PANAS',
    'MANIS',
    'TAWAR',
    'GORENG',
    'KUAH'
);


ALTER TYPE public."Variant" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 135275)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 135466)
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    table_number text NOT NULL,
    total_price double precision NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 135465)
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 217
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- TOC entry 220 (class 1259 OID 135475)
-- Name: order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer,
    quantity integer NOT NULL
);


ALTER TABLE public.order_item OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 135474)
-- Name: order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_item_id_seq OWNER TO postgres;

--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 219
-- Name: order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_item_id_seq OWNED BY public.order_item.id;


--
-- TOC entry 216 (class 1259 OID 135457)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name text NOT NULL,
    category public."ProductCategory" NOT NULL,
    variant public."Variant",
    price double precision NOT NULL,
    printer_station jsonb NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 135456)
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 215
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- TOC entry 3196 (class 2604 OID 135469)
-- Name: order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 135478)
-- Name: order_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item ALTER COLUMN id SET DEFAULT nextval('public.order_item_id_seq'::regclass);


--
-- TOC entry 3195 (class 2604 OID 135460)
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- TOC entry 3350 (class 0 OID 135275)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('80ffb344-e65c-434a-aa5a-348b11752663', 'c37a063fc988162e0c3128073530262eadb750bf0ee944ebf996c829bb4e71a4', '2024-08-02 23:02:23.591143+07', '20240802160105_first_init', NULL, NULL, '2024-08-02 23:02:23.47932+07', 1);
INSERT INTO public._prisma_migrations VALUES ('4e3c52fc-66e6-4a6c-b6db-a4cfef06893f', '19fffeb9566be61f4476167aeb901ada200652b35eef1692560182d1c5e48384', '2024-08-02 23:02:27.89613+07', '20240802160227_first_init', NULL, NULL, '2024-08-02 23:02:27.776263+07', 1);


--
-- TOC entry 3354 (class 0 OID 135466)
-- Dependencies: 218
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."order" VALUES (1, 'MEJA NO 1', 79000);
INSERT INTO public."order" VALUES (2, 'MEJA NO 1', 61000);
INSERT INTO public."order" VALUES (3, 'MEJA NO 1', 30000);
INSERT INTO public."order" VALUES (4, 'MEJA NO 1', 15000);
INSERT INTO public."order" VALUES (5, 'MEJA NO 1', 12000);
INSERT INTO public."order" VALUES (6, 'MEJA NO 1', 18000);
INSERT INTO public."order" VALUES (7, 'MEJA NO 2', 56000);


--
-- TOC entry 3356 (class 0 OID 135475)
-- Dependencies: 220
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.order_item VALUES (1, 1, 8, 1);
INSERT INTO public.order_item VALUES (2, 1, 3, 1);
INSERT INTO public.order_item VALUES (3, 1, 11, 2);
INSERT INTO public.order_item VALUES (4, 1, 6, 1);
INSERT INTO public.order_item VALUES (5, 1, 1, 1);
INSERT INTO public.order_item VALUES (6, 2, 8, 1);
INSERT INTO public.order_item VALUES (7, 2, 3, 1);
INSERT INTO public.order_item VALUES (8, 2, 11, 2);
INSERT INTO public.order_item VALUES (9, 2, 6, 1);
INSERT INTO public.order_item VALUES (10, 2, 1, 1);
INSERT INTO public.order_item VALUES (11, 3, 6, 1);
INSERT INTO public.order_item VALUES (12, 3, 1, 1);
INSERT INTO public.order_item VALUES (13, 4, 1, 1);
INSERT INTO public.order_item VALUES (14, 5, 1, 1);
INSERT INTO public.order_item VALUES (15, 6, 6, 1);
INSERT INTO public.order_item VALUES (16, 6, 1, 1);
INSERT INTO public.order_item VALUES (17, 7, 5, 5);
INSERT INTO public.order_item VALUES (18, 7, 3, 2);


--
-- TOC entry 3352 (class 0 OID 135457)
-- Dependencies: 216
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product VALUES (1, 'Jeruk', 'MINUMAN', 'DINGIN', 12000, '["C"]');
INSERT INTO public.product VALUES (2, 'Jeruk', 'MINUMAN', 'PANAS', 10000, '["C"]');
INSERT INTO public.product VALUES (3, 'Teh', 'MINUMAN', 'MANIS', 8000, '["C"]');
INSERT INTO public.product VALUES (4, 'Teh', 'MINUMAN', 'TAWAR', 5000, '["C"]');
INSERT INTO public.product VALUES (5, 'Kopi', 'MINUMAN', 'DINGIN', 8000, '["C"]');
INSERT INTO public.product VALUES (6, 'Kopi', 'MINUMAN', 'PANAS', 6000, '["C"]');
INSERT INTO public.product VALUES (7, 'EXTRA ES BATU', 'MINUMAN', NULL, 2000, '["C"]');
INSERT INTO public.product VALUES (8, 'Mie', 'MAKANAN', 'GORENG', 15000, '["B"]');
INSERT INTO public.product VALUES (9, 'Mie', 'MAKANAN', 'KUAH', 15000, '["B"]');
INSERT INTO public.product VALUES (10, 'Nasi Goreng', 'MAKANAN', NULL, 15000, '["B"]');
INSERT INTO public.product VALUES (11, 'Promo Nasi Goreng + Jeruk Dingin', 'PROMO', NULL, 23000, '["B", "C"]');
INSERT INTO public.product VALUES (12, 'updated', 'MINUMAN', 'DINGIN', 1000, '["C"]');


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 217
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 7, true);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 219
-- Name: order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_item_id_seq', 18, true);


--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 215
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 12, true);


--
-- TOC entry 3199 (class 2606 OID 135283)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 135480)
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 135473)
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 135464)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- TOC entry 3206 (class 2606 OID 135481)
-- Name: order_item order_item_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3207 (class 2606 OID 135486)
-- Name: order_item order_item_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-08-03 13:20:41

--
-- PostgreSQL database dump complete
--

