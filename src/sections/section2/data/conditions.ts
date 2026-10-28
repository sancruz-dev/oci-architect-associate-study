export interface ConditionPreset {
  id: string;
  chip: string;
  statement: string;
  meaning: string;
  watch: string;
}

/** Exemplos de condições, no estilo da documentação Oracle. */
export const CONDITION_PRESETS: ConditionPreset[] = [
  {
    id: 'prazo',
    chip: 'Acesso com prazo',
    statement:
      "Allow group Contractors to manage instance-family in tenancy\n  where request.utc-timestamp before '2027-01-01T00:00Z'",
    meaning: 'Prestadores administram instâncias só até a data. Depois dela, as requisições são negadas sem ninguém editar a policy.',
    watch: 'A data é em UTC, no formato ISO 8601.',
  },
  {
    id: 'meses',
    chip: 'Só em alguns meses',
    statement:
      "Allow group SummerInterns to manage instance-family in tenancy\n  where ANY {request.utc-timestamp.month-of-year in ('6', '7', '8')}",
    meaning: 'Estagiários de verão só têm acesso em junho, julho e agosto.',
    watch: 'O operador in compara com uma lista de valores.',
  },
  {
    id: 'dias',
    chip: 'Só em dias úteis',
    statement:
      "Allow group WorkWeek to manage instance-family\n  where ANY {request.utc-timestamp.day-of-week in ('monday', 'tuesday', 'wednesday', 'thursday', 'friday')}",
    meaning: 'O grupo só age de segunda a sexta.',
    watch: 'O dia da semana também é calculado em UTC.',
  },
  {
    id: 'turno',
    chip: 'Horário comercial',
    statement:
      "Allow group DayShift to manage instance-family\n  where request.utc-timestamp.time-of-day between '12:00:00Z' and '21:00:00Z'",
    meaning: 'Das 9h às 18h em Brasília (UTC−3) vira 12:00Z a 21:00Z.',
    watch: 'Converta o fuso você mesmo. Onde há horário de verão, a policy precisa ser atualizada quando o offset muda.',
  },
  {
    id: 'permissao',
    chip: 'Tirar uma permissão',
    statement: "Allow group XYZ to manage groups in tenancy\n  where request.permission != 'GROUP_DELETE'",
    meaning: 'Gerencia grupos, menos excluir. A permissão vai em maiúsculas.',
    watch: 'Condições só restringem o statement em que estão. Veja a pegadinha do pai e do filho abaixo.',
  },
  {
    id: 'grupo',
    chip: 'Excluir um alvo',
    statement:
      "Allow group GroupAdmins to use users in tenancy\n  where target.group.name != 'Administrators'",
    meaning: 'Admins de grupos mexem em usuários, exceto nos membros do grupo Administrators.',
    watch: 'Operações sem target.group.name, como ListUsers, são negadas. Precisa de um statement extra: Allow group GroupAdmins to inspect users in tenancy.',
  },
  {
    id: 'mfa',
    chip: 'Exigir MFA',
    statement:
      "Allow group Finance to manage object-family in tenancy\n  where request.user.mfaTotpVerified='true'",
    meaning: 'A requisição só passa se o usuário se autenticou com MFA por TOTP.',
    watch: 'Útil para dados sensíveis.',
  },
];
