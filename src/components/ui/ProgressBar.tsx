import { cx } from '../../core/cx';

interface ProgressBarProps {
  percent: number;
  label: string;
}

export function ProgressBar({ percent, label }: ProgressBarProps) {
  return (
    <div
      className={cx('pbar', percent >= 100 && 'pbar--done')}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <div className="pbar__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
