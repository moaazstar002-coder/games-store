import { FaGamepad } from "react-icons/fa";
import CatalogProductsPage from "./CatalogProductsPage";

export default function Consoles() {
  return (
    <CatalogProductsPage
      productType="consoles"
      title="أجهزة الألعاب"
      description="قارن أجهزة PlayStation وXbox وNintendo وأجهزة الألعاب المحمولة."
      icon={FaGamepad}
      filterLabel="المنصة"
      filterOptions={[
        { value: "PlayStation", label: "PlayStation" },
        { value: "Xbox", label: "Xbox" },
        { value: "Nintendo", label: "Nintendo" },
        { value: "PC Handheld", label: "أجهزة PC المحمولة" },
      ]}
    />
  );
}
