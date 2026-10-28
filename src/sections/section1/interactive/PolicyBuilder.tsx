import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { PolicyLine } from '../../../components/ui/CodeBlock';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';
import { LOCATIONS, RESOURCES, SUBJECTS, VERBS, VERB_TEXT, type Verb } from '../data/policy';

/** Monte uma policy escolhendo sujeito, verbo, recurso e local. */
export function PolicyBuilder() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [verb, setVerb] = useState<Verb>('use');
  const [resource, setResource] = useState('instance-family');
  const [location, setLocation] = useState('compartment Prod');

  const verbIndex = VERBS.indexOf(verb);
  const isDynamic = subject.startsWith('dynamic-group');
  const who = isDynamic
    ? 'As instâncias que casam com as regras do dynamic group AppServers (agindo como instance principals)'
    : `Os usuários do grupo ${subject.replace('group ', '')}`;

  return (
    <Box>
      <p className="mono syntax">
        <b>Allow</b> &lt;sujeito&gt; <b>to</b> &lt;verbo&gt; &lt;tipo de recurso&gt; <b>in</b> &lt;local&gt; [<b>where</b>{' '}
        &lt;condição&gt;]
      </p>

      <div className="builder">
        <SelectField label="Sujeito" value={subject} options={SUBJECTS} onChange={setSubject} />
        <SelectField label="Verbo" value={verb} options={[...VERBS]} onChange={(v) => setVerb(v as Verb)} />
        <SelectField label="Tipo de recurso" value={resource} options={Object.keys(RESOURCES)} onChange={setResource} />
        <SelectField label="Local" value={location} options={Object.keys(LOCATIONS)} onChange={setLocation} />
      </div>

      <div className="ladder" aria-hidden="true">
        {VERBS.map((v, i) => (
          <div key={v} className={cx(i === verbIndex && 'cur', i < verbIndex && 'on')}>
            {v}
          </div>
        ))}
      </div>

      <PolicyLine subject={subject} verb={verb} resource={resource} location={location} />

      <dl className="kv" aria-live="polite">
        <dt>Quem</dt>
        <dd>{who}</dd>
        <dt>Pode</dt>
        <dd>{VERB_TEXT[verb]}</dd>
        <dt>Sobre</dt>
        <dd>{RESOURCES[resource]}</dd>
        <dt>Onde</dt>
        <dd>{LOCATIONS[location]}</dd>
      </dl>

      {verb === 'manage' && resource === 'all-resources' && location === 'tenancy' && (
        <Callout title="Cuidado">
          <p>
            Esta policy se aproxima do poder do grupo Administrators. Em geral é melhor restringir o verbo, o tipo de
            recurso ou o compartimento.
          </p>
        </Callout>
      )}
      {verb === 'inspect' && (
        <p className="muted mb0" style={{ fontSize: 14 }}>
          Dica de prova: inspect só enxerga que o recurso existe. Para abrir os detalhes é preciso read.
        </p>
      )}
    </Box>
  );
}
