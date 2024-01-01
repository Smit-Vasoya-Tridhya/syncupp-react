'use client';
import HeliumLayout from '@/layouts/helium/helium-layout';
import { useIsMounted } from '@/hooks/use-is-mounted';



export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <HeliumLayout>{children}</HeliumLayout>;
}
