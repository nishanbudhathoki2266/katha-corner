import SectionContainer from "@/components/UI/SectionContainer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionContainer>{children}</SectionContainer>;
}
