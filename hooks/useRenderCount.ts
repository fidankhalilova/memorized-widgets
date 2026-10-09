// counts how many times a component rendered and logs it to the console

import { useRef } from "react";

export function useRenderCount(name: string): number {
  const count = useRef(0);
  count.current += 1;
  console.log(`[render] ${name} #${count.current}`);
  return count.current;
}