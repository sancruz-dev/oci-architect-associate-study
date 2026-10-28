export interface TagVariable {
  id: string;
  chip: string;
  variable: string;
  carries: string;
  statement: string;
  reading: string;
}

export const TAG_VARIABLES: TagVariable[] = [
  {
    id: 'group',
    chip: 'Tag no grupo',
    variable: 'request.principal.group.tag.{namespace}.{key}',
    carries: 'O grupo (de usuários ou dynamic group) de quem faz a requisição',
    statement:
      "allow any-user to manage all-resources in compartment Test where\n  request.principal.group.tag.EmployeeGroup.Role='Admin'",
    reading: 'Qualquer usuário que pertença a um grupo marcado com EmployeeGroup.Role=Admin administra tudo em Test. Para dar o acesso a outro grupo, basta aplicar a tag nele.',
  },
  {
    id: 'reqcomp',
    chip: 'Tag no compartimento do solicitante',
    variable: 'request.principal.compartment.tag.{namespace}.{key}',
    carries: 'O compartimento onde está o recurso que faz a requisição (dynamic group)',
    statement:
      "allow dynamic-group InstancesA to manage instances in tenancy where\n  request.principal.compartment.tag.Operations.Project='Prod'",
    reading: 'Instâncias do dynamic group InstancesA cujo compartimento tem a tag Operations.Project=Prod.',
  },
  {
    id: 'resource',
    chip: 'Tag no recurso alvo',
    variable: 'target.resource.tag.{namespace}.{key}',
    carries: 'O recurso em que a ação acontece',
    statement:
      "allow group GroupA to manage all-resources in compartment HR where\n  target.resource.tag.Operations.Project='Prod'",
    reading: 'GroupA age só nos recursos de HR marcados com Operations.Project=Prod. Marcou, tem acesso. Tirou a tag, perdeu.',
  },
  {
    id: 'targetcomp',
    chip: 'Tag no compartimento alvo',
    variable: 'target.resource.compartment.tag.{namespace}.{key}',
    carries: 'O compartimento que contém o recurso alvo',
    statement:
      "allow group Testers to use all-resources in tenancy where\n  target.resource.compartment.tag.ResourceGroup.Role='Test'",
    reading: 'Testers usam tudo em qualquer compartimento marcado como ResourceGroup.Role=Test. A tag vale também para os subcompartimentos.',
  },
  {
    id: 'wild',
    chip: 'Qualquer valor (*)',
    variable: 'target.resource.tag.{namespace}.{key} = \'*\'',
    carries: 'Qualquer valor da tag',
    statement:
      "allow group GroupA to use all-resources in compartment HR where\n  target.resource.tag.HR.Project= '*'",
    reading: 'Basta o recurso ter a chave HR.Project, com qualquer valor.',
  },
];
