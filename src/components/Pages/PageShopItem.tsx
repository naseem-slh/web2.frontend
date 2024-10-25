import { Link, useParams } from "react-router-dom";
import { ShopItemResource } from "../../Resources";
import { getShopItem } from "../../backend/shopperapi";
import { useErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import ItemCardComp from "../bootstrapComp/ItemCardComp";
import HeaderComp from "../bootstrapComp/HeaderComp";
import { useLoginContext } from "../../LoginContext";

export default function PageShopItem() {
    const [shopItem, setShopItem] = useState<ShopItemResource | null>()
    const { showBoundary } = useErrorBoundary();
    const { loginInfo } = useLoginContext();
    const params = useParams()

    async function load() {
        try {
            const itemID = params.shopitemID
            const shopItemData = await getShopItem(itemID!)
            setShopItem(shopItemData)
        }
        catch (err) {
            showBoundary(err);
        }
    }
    useEffect(() => { load() }, [loginInfo])

    if (!shopItem) {
        return <LoadingIndicator />
    }

    return (

        <div>
            <HeaderComp whatsDisplayed={3} />
            <div style={cardContainerStyle}>
                <ItemCardComp key={shopItem.id} shopItem={shopItem} linkDisplayed={false} />
            </div>
        </div>
    )
}

const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
};