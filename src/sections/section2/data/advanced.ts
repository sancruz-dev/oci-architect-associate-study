export interface AdvancedFeature {
  id: string;
  chip: string;
  statement: string;
  meaning: string;
  watch: string;
}

export const ADVANCED_FEATURES: AdvancedFeature[] = [
  {
    id: 'perm',
    chip: 'Permissão específica',
    statement:
      "Allow group BucketUsers to manage objects in tenancy\n  where request.permission != 'OBJECT_DELETE'",
    meaning:
      'O verbo manage é um pacote de permissões. Com request.permission você tira uma delas do pacote, sem ter de listar as outras.',
    watch: 'request.operation faz o mesmo no nível da chamada de API, como request.operation=\'ListGroups\'.',
  },
  {
    id: 'padrao',
    chip: 'Padrão com *',
    statement: 'Allow group BucketUsers to use buckets in tenancy\n  where target.bucket.name=/ProjectA_*/',
    meaning:
      'Casa nomes por prefixo, sufixo ou trecho. Também aparece entre aspas: target.object.name = \'prod/*\' ou \'*.pdf\'.',
    watch: 'Com padrões, o nome do recurso vira controle de acesso.',
  },
  {
    id: 'any',
    chip: 'any-user',
    statement:
      "Allow any-user to read object-family in compartment ObjectStorage\n  where request.user.id = 'ocid1.user.oc1..<user_OCID>'",
    meaning:
      'any-user é qualquer principal autenticado no tenancy. Quem restringe é a condição. É a forma usada quando o critério não é um grupo, como o OCID do usuário ou tags.',
    watch: 'Sem condição, any-user abre para todo mundo. Revise a condição com cuidado.',
  },
  {
    id: 'cross',
    chip: 'Entre tenancies',
    statement:
      'Define tenancy DestinationTenancy as ocid1.tenancy.oc1..<unique_ID>\nEndorse group StorageAdmins to manage object-family in tenancy DestinationTenancy',
    meaning:
      'Acesso entre tenancies usa três palavras: Define dá um apelido a um OCID, Endorse (no tenancy de origem) permite que o grupo saia, Admit (no tenancy de destino) aceita a entrada.',
    watch: 'Os dois lados precisam concordar: sem o Admit correspondente, o Endorse não concede nada.',
  },
];
