import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { InitialSetup } from "@/features/builder/InitialSetup";

export default function Admin() {
  return (
    <main className="flex flex-col items-center gap-6">
      <div className="flex w-2/4 items-center justify-between rounded-xl bg-white px-5 py-3 drop-shadow">
        <p>Want to make your shop bigger or open more useful features?</p>
        <PrimaryButton
          buttonType="link"
          text="Select plan"
          to="/registration"
          className="h-10 w-32"
        />
      </div>
      <div className="flex w-2/4 items-center justify-between rounded-xl bg-white drop-shadow">
        <InitialSetup />
      </div>
    </main>
  );
}
