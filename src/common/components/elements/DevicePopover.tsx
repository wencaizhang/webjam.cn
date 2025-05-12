import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BsCpu as DeviceIcon, BsDot as DotIcon } from 'react-icons/bs';

import { PAIR_DEVICES } from '@/common/constant/devices';
import { DeviceProps } from '@/common/types/spotify';

import AnimatedBars from './AnimatedBars';

interface DevicePopoverProps {
  devices: DeviceProps[];
  isShow: boolean;
}

const DevicePopover = ({ devices, isShow }: DevicePopoverProps) => {
  const listDevices = devices?.map((device) => ({
    ...device,
    icon: PAIR_DEVICES[device?.type]?.icon || (
      <DeviceIcon
        className='w-auto text-neutral-700 dark:text-neutral-300'
        size={24}
      />
    ),
  }));

  return (
    <Transition
      as={Fragment}
      show={isShow}
      enter='transition ease-out duration-200'
      enterFrom='opacity-0 translate-y-1'
      enterTo='opacity-100 translate-y-0'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 translate-y-1'
    >
      <Popover.Panel className='absolute bottom-10 right-0 z-20 w-max'>
        <div className='flex flex-col gap-5 py-5 px-6 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-neutral-100 dark:bg-neutral-800 dark:text-white'>
          {listDevices?.map((device, index) => (
            <div
              key={index}
              className='flex items-center w-full justify-between gap-3'
            >
              {device?.icon}
              <div className='flex flex-col grow pl-0.5 pr-2'>
                <span className='font-medium font-sora'>{device?.name}</span>
                <span className='text-xs font-light text-neutral-600 dark:text-neutral-400'>
                  {device?.model}
                </span>
              </div>
              {device?.is_active ? (
                <AnimatedBars variant='bg-green-500' />
              ) : (
                <DotIcon
                  className='ml-2 w-auto text-neutral-600 dark:text-neutral-400'
                  size={22}
                />
              )}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Transition>
  );
};

export default DevicePopover;
