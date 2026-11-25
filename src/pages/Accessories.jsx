import { FaHeadphones } from "react-icons/fa";
import CatalogProductsPage from "./CatalogProductsPage";

export default function Accessories() {
  return (
    <CatalogProductsPage
      productType="accessories"
      title="الإكسسوارات"
      description="اكتشف أيدي التحكم والسماعات ولوحات المفاتيح والإكسسوارات المتوافقة مع منصتك."
      icon={FaHeadphones}
      filterLabel="نوع الإكسسوار"
      filterOptions={[
        { value: "Controllers", label: "أيدي التحكم" },
        { value: "Headsets", label: "سماعات الرأس" },
        { value: "Keyboards", label: "لوحات المفاتيح" },
        { value: "Mice", label: "الفأرات" },
        { value: "Docks & Cables", label: "قواعد التوصيل والكابلات" },
      ]}
    />
  );
}
