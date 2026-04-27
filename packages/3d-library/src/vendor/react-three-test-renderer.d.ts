declare module "@react-three/test-renderer" {
  import type { ReactNode } from "react";

  const ReactThreeTestRenderer: {
    create: (element: ReactNode) => Promise<{
      scene: {
        children: unknown[];
        findByProps: (props: Record<string, unknown>) => { type: string };
      };
    }>;
  };
  export default ReactThreeTestRenderer;
}
