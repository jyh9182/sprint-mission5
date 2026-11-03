'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva('ui-button inline-flex items-center justify-center gap-3 whitespace-nowrap font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-40', {variants:{variant:{default:'bg-[var(--ink)] text-white hover:bg-[var(--hover)]',secondary:'border border-[var(--border)] bg-white text-[var(--ink)] hover:bg-[var(--surface)]',ghost:'text-[var(--ink)] hover:bg-[var(--surface)]'},size:{default:'h-14 px-7 text-base',sm:'h-11 px-5 text-sm',icon:'size-11 p-0'}},defaultVariants:{variant:'default',size:'default'}});
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function useClientReady() {
  return React.useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

export function Button({className,variant,size,asChild=false,...props}:React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {asChild?:boolean}) {
  const ready = useClientReady();
  const Comp = asChild ? Slot : 'button';
  const disabled = props.disabled || (Boolean(props.onClick) && !ready);
  return <Comp data-slot="button" className={cn(buttonVariants({variant,size,className}))} {...props} disabled={asChild ? undefined : disabled}/>;
}
export {buttonVariants};
