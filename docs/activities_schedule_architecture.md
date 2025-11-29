# Arquitetura proposta para Turmas, Sessões e Presenças

Visão geral para modelar turmas recorrentes, sessões individuais, matrículas e presenças, tomando a EVO como referência mas mantendo o controle no Firestore.

## Estruturas de dados (coleções sugeridas)

- **activities** (catálogo)  
  Atividade base (nome, cor, duração/capacidade padrão, ativa).

- **activities_configs** (configuração de turma/recorrência)  
  Um doc por turma. Exemplo:
  ```json
  {
    "idConfiguration": "configId",
    "idActivity": "activityId",
    "idArea": "areaId",
    "instructorId": "employeeId",
    "capacity": 20,
    "startDate": "2024-06-01",
    "endDate": "2024-12-31",      // null/"" = sem fim (gerar por janela)
    "startTime": "15:00",
    "duration": 60,               // minutos
    "daysOfWeek": [1,3],          // 0=dom, 1=seg, 3=qua...
    "code": "",
    "status": 1,
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

- **activities_sessions** (sessões/ocorrências)  
  Geradas a partir das configs, uma por data/ocorrência:
  ```json
  {
    "idActivitySession": "sessionId",
    "idConfiguration": "configId",
    "idActivity": "activityId",
    "activityDate": "2024-06-03",
    "startTime": "15:00",
    "endTime": "16:00",
    "capacity": 20,
    "ocupation": 0,
    "status": 1,
    "instructorId": "employeeId",
    "idArea": "areaId",
    "allowChoosingSpot": false,
    "spots": [],
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

- **activities_enrollments** (matrículas em turma)  
  Relação aluno x turma (config):
  ```json
  {
    "idEnrollment": "enrollId",
    "idConfiguration": "configId",
    "idMember": "memberId",
    "enrollDate": "2024-06-01",
    "cancelDate": null,           // setar ao desmatricular
    "status": "active"            // active|canceled
  }
  ```

- **activities_attendance** (presença por sessão)  
  Marcada por sessão e membro:
  ```json
  {
    "idAttendance": "attId",
    "idActivitySession": "sessionId",
    "idConfiguration": "configId",
    "idMember": "memberId",
    "status": "present",          // present|absent|justified
    "checkInAt": "2024-06-03T14:55:00Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

## Fluxo recomendado

1. **Criar atividade** (catálogo).  
2. **Criar configuração de turma** em `activities_configs`.  
3. **Gerar sessões** em `activities_sessions` a partir da config (janela rolante para startDate/endDate; se sem endDate, gerar N semanas à frente).  
4. **Matricular aluno** em `activities_enrollments`. Aluno aparece em sessões futuras enquanto `status=active` e `cancelDate` vazio ou > activityDate.  
5. **Marcar presença** por sessão em `activities_attendance`; histórico é preservado se a matrícula for cancelada depois.  

## Helpers/Redux sugeridos

- `activities_helper` / redux `activities`: catálogo.
- `activities_schedule_helper` / redux `activitiesSchedule`: CRUD de configs (não gera sessão).  
- `activities_sessions_helper` / redux `activitiesSessions`: listar/get/atualizar sessões; opcional gerar sessões a partir das configs (job/batch).  
- `activities_enrollments_helper` / redux `activitiesEnrollments`: matricular/desmatricular aluno na turma.  
- `activities_attendance_helper` / redux `activitiesAttendance`: marcar presença/ausência por sessão, listar presenças da sessão.  

### Detalhamento por helper e store

- **activities_helper**  
  - métodos: `listActivities()`, `getActivity(id)`, `createActivity(payload)`, `updateActivity(id, payload)`, `deleteActivity(id)`, upload de foto opcional.  
  - coleção: `activities`.  
  - redux `activities`: state `{ items, loading, error, creating, updating, deleting, created, updated, deletedId }`; actions `FETCH_LIST/CREATE/UPDATE/DELETE + success/fail`.

- **activities_schedule_helper** (configs)  
  - métodos: `listConfigs(filters)`, `getConfig(id)`, `createConfig(payload)`, `updateConfig(id, payload)`, `deleteConfig(id)`.  
  - salva apenas campos de recorrência (idActivity, idArea, instructorId, capacity, startDate, endDate, startTime, duration, daysOfWeek, status, code).  
  - coleção: `activities_configs`.  
  - redux `activitiesSchedule`: state análogo a activities (lista, created, updated, deletedId), actions `FETCH_CONFIGS/CREATE/UPDATE/DELETE`.

- **activities_sessions_helper** (sessões)  
  - métodos: `listSessions(filters)`, `getSession(idSession)`, `updateSession(idSession, payload)`; `ensureSessionsForConfig(config, { weeksAhead, fromDate })` garante uma janela rolante de ocorrências criando somente as datas futuras faltantes.  
  - coleção: `activities_sessions`.  
  - redux `activitiesSessions`: state `{ items, loading, error, ensuring }` com filtros `idConfiguration`, `idActivity`, `dateRange (start/end)` e action `ENSURE_SESSIONS` para disparar o helper antes de buscar.

- **activities_enrollments_helper** (matrículas)  
  - métodos: `enroll({ idConfiguration, idMember, enrollDate })`, `unenroll(idEnrollment, cancelDate)`, `listEnrollments(filters)` (por config ou member).  
  - coleção: `activities_enrollments`.  
  - redux `activitiesEnrollments`: state `{ items, loading, error, enrolling, unenrolling, enrolled, unenrolledId }`, actions `ENROLL/UNENROLL/LIST`.

- **activities_attendance_helper** (presenças)  
  - métodos: `listAttendance(idActivitySession)`, `markAttendance({ idActivitySession, idMember, status })`, `bulkMark(sessionId, list)` opcional.  
  - coleção: `activities_attendance`.  
  - redux `activitiesAttendance`: state `{ items, loading, saving, error }`, actions `FETCH_ATTENDANCE`, `MARK_ATTENDANCE`.

### Sugestão de actions/sagas básicas
- `activities`: `fetchActivities`, `createActivity`, `updateActivity`, `deleteActivity`.
- `activitiesSchedule`: `fetchConfigs`, `createConfig`, `updateConfig`, `deleteConfig`.
- **activitiesSessions**: `fetchSessions` (filtros), `ensureSessions(config, weeksAhead)` para popular a janela visível, `updateSession` (status/ocupation).
- `activitiesEnrollments`: `enrollMember`, `unenrollMember`, `fetchEnrollmentsByConfig`.
- `activitiesAttendance`: `fetchAttendanceBySession`, `markAttendance`.

### Janela rolante de sessões

- Cada config salva apenas os metadados recorrentes; as sessões são criadas sob demanda por `ensureSessionsForConfig`.  
- A janela padrão gerada cobre `weeksAhead` (4 semanas por padrão) a partir da maior data entre `startDate`, data de hoje ou `fromDate` solicitado pela UI.  
- Ao navegar para semanas futuras, o grid dispara `ENSURE_SESSIONS` com `fromDate` = início da semana desejada; o helper cria somente as datas inexistentes, evitando duplicação.  
- Opcional: persistir em cada config um campo `generatedUntil` para reduzir chamadas e permitir auditoria das janelas já criadas.

### Relacionamento entre entidades
- Config (`activities_configs`) → gera Sessões (`activities_sessions`) por data.  
- Matrícula (`activities_enrollments`) liga Member ↔ Config; usado para listar alunos esperados em cada sessão.  
- Presença (`activities_attendance`) registra status do aluno em uma sessão específica.  

## Estratégia de métricas e custo (Firestore)
- **Agregações incrementais**: manter contadores em docs de stats (ex.: `activities_configs/{id}/stats`) com total de matrículas ativas, presenças por período, ocupação média. Atualizar via Cloud Functions onWrite (matrícula/presença) ou batches no backend.  
- **Sessões com contadores**: campos como `ocupation`, `attendanceCount` atualizados ao marcar presença ou matrícula, evitando varredura.  
- **Índices secundários**: subcoleções por aluno (`members/{id}/enrollments`) ou cache de “expected attendees” por sessão para leitura rápida.  
- **Consultas por janela**: sempre filtrar por intervalo de datas (semana/mês) e usar `take/skip`/paginação.  
- **Jobs/Functions**: agendar geração de sessões futuras e atualização de métricas (frequência, taxa de presença) em lote.  
- **Batch/transactions**: matrícula/remoção e marcação de presença devem atualizar contadores e stats no mesmo batch/transaction.  
- **Endpoints/Helpers agregados**: expor helpers/rotas que já retornem stats (taxa de frequência, ocupação) para reduzir leituras client-side.  

## Comportamentos-chave

- Matrícula em turma → aluno deve constar nas sessões futuras (verificada por matrícula ativa na data).  
- Cancelar matrícula → parar de exibir em sessões futuras, manter presenças passadas.  
- Turma seg/qua 15h → duas sessões por semana, cada data é um doc em `activities_sessions`, permitindo presença dia a dia.  
