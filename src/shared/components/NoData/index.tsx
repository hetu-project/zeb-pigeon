import { CloudIcon } from '@heroicons/react/24/solid';

export default function NoData() {
  return (
    <div className="flex h-full relative items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div>
          <CloudIcon className="w-10 h-10" />
        </div>
        <div>{'No Data'}</div>
      </div>
    </div>
  );
}
