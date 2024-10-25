import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { ShopperResource } from "../../Resources";
import LoadingIndicator from "../LoadingIndicator";
import { getShopper } from "../../backend/shopperapi";
import ListCardComp from "../bootstrapComp/ListCardComp";
import "../../PageCSS/PageShopper.css";
import HeaderComp from "../bootstrapComp/HeaderComp";
import { useLoginContext } from "../../LoginContext";

export default function PageShopper() {
  const [shopper, setShopper] = useState<ShopperResource | null>(null);
  const { showBoundary } = useErrorBoundary();
  const { loginInfo } = useLoginContext();
  
  async function load() {
    try {
      const shopperData: ShopperResource = await getShopper();
      setShopper(shopperData);
    } catch (err) {
      showBoundary(err);
    }
  }

  useEffect(() => {
    load();
  }, [loginInfo]);

  if (!shopper) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <HeaderComp whatsDisplayed={1} />
      <div className="shopListsContainer">
        {shopper.shopLists.map((shopList) => (
          <div key={shopList.id}>
            <ListCardComp shopList={shopList} linkDisplayed={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
