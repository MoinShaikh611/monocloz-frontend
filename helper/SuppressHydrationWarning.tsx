import { useEffect, useState } from "react";
interface SuppressHydrationWarningProps {
  children: React.ReactNode;
}
const SuppressHydrationWarning: React.FC<SuppressHydrationWarningProps> = ({
  children,
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
};

export default SuppressHydrationWarning;
