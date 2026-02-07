'use client';

import { CopilotChat, CopilotKitCSSProperties } from '@copilotkit/react-ui';
import { useState } from 'react';

export default function CopilotKitPage() {
  const [themeColor] = useState('#6366f1');

  return (
    <main className="h-full" style={{ '--copilot-kit-primary-color': themeColor } as CopilotKitCSSProperties}>
      <CopilotChat className="h-full" />
    </main>
  );
}
