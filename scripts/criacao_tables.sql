-- ==============================================================================
-- 1. NÚCLEO DE USUÁRIOS E DADOS PESSOAIS (Seu script base adaptado)
-- ==============================================================================

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) CHECK (tipo IN ('ALUNO', 'PROFESSOR', 'ADMIN')) NOT NULL DEFAULT 'ALUNO',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE person (
    id BIGSERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    birth DATE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_id INT UNIQUE,
    CONSTRAINT fk_person_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    person_id BIGINT NOT NULL,
    CONSTRAINT fk_address_person FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

-- ==============================================================================
-- 2. DOMÍNIO PEDAGÓGICO: TÓPICOS, AVALIAÇÕES E QUESTÕES
-- ==============================================================================

CREATE TABLE topicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT
);

CREATE TABLE questoes (
    id SERIAL PRIMARY KEY,
    avaliacao_id INT REFERENCES avaliacoes(id) ON DELETE CASCADE,
    topico_id INT REFERENCES topicos(id) ON DELETE CASCADE,
    enunciado TEXT NOT NULL,
    peso INT DEFAULT 1
);

-- ==============================================================================
-- 3. MOTOR DE DIAGNÓSTICO (Avalia as dificuldades do Aluno)
-- ==============================================================================

CREATE TABLE diagnosticos_aluno (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE,
    topico_id INT REFERENCES topicos(id) ON DELETE CASCADE,
    pontuacao_pct DECIMAL(5,2) NOT NULL, -- Ex: 45.50 (45,5%)
    status_defasagem VARCHAR(20) CHECK (status_defasagem IN ('CRITICA', 'MODERADA', 'SEM_DEFASAGEM')),
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 4. TRILHAS DE APRENDIZADO E CONTEÚDOS RECOMENDADOS
-- ==============================================================================

CREATE TABLE trilhas_aprendizado (
    id SERIAL PRIMARY KEY,
    topico_id INT REFERENCES topicos(id) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    nivel VARCHAR(20) CHECK (nivel IN ('BASICO', 'INTERMEDIARIO', 'AVANCADO'))
);

CREATE TABLE conteudos_trilha (
    id SERIAL PRIMARY KEY,
    trilha_id INT REFERENCES trilhas_aprendizado(id) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    tipo VARCHAR(30) CHECK (tipo IN ('VIDEO', 'ARTIGO', 'EXERCICIO')),
    url TEXT NOT NULL,
    ordem INT NOT NULL
);

-- ==============================================================================
-- 5. ACOMPANHAMENTO DO ALUNO NA TRILHA
-- ==============================================================================

CREATE TABLE progresso_trilha_aluno (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE,
    trilha_id INT REFERENCES trilhas_aprendizado(id) ON DELETE CASCADE,
    percentual_concluido DECIMAL(5,2) DEFAULT 0.0,
    status VARCHAR(20) CHECK (status IN ('EM_ANDAMENTO', 'CONCLUIDO')) DEFAULT 'EM_ANDAMENTO'
);