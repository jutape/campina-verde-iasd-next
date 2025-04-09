import UserDropdown from "@/components/user-dropdown";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="absolute top-4 right-4">
        <UserDropdown />
      </div>
      {children}
    </div>
  );
}
