import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Link, useParams } from "react-router-dom";
import { ShopListItemsResource, ShopListResource } from "../../Resources";
import { getShopItems, getShopList } from "../../backend/shopperapi";
import LoadingIndicator from "../LoadingIndicator";
import ListCardComp from "../bootstrapComp/ListCardComp";
import HeaderComp from "../bootstrapComp/HeaderComp";
import ItemCardComp from "../bootstrapComp/ItemCardComp";
import "../../PageCSS/PageShopList.css";
import { useLoginContext } from "../../LoginContext";


export default function PageShopList() {
    const [shopItems, setShopItems] = useState<ShopListItemsResource | null>()
    const [shopList, setShopList] = useState<ShopListResource | null>()
    const { showBoundary } = useErrorBoundary();
    const { loginInfo } = useLoginContext();

    const params = useParams()

    async function load() {
        try {
            const myListID = params.shoplistID
            const shopListData = await getShopList(myListID!)
            const shopItemsData = await getShopItems(shopListData.id!)
            setShopItems(shopItemsData)
            setShopList(shopListData)
        }
        catch (err) {
            showBoundary(err);
        }
    }
    useEffect(() => { load() }, [loginInfo])

    if (!shopItems || !shopList) {
        return <LoadingIndicator />
    }
    return (

        <div>
            <HeaderComp whatsDisplayed={2} />
            <div style={cardContainerStyle}>
                <ListCardComp
                    key={shopList.id}
                    shopList={shopList}
                />
            </div>
            {
                (shopList.shopItemCount! > 0) && (
                    <h2 className="text-center">ShopItems:</h2>)
            }
            <div className="shopItemContainer">
    {
        shopItems.shopItems.map((shopItem) => (
            <div key={shopItem.id}>
                <ItemCardComp shopItem={shopItem} linkDisplayed={true} />
            </div>
        ))
    }
</div>


        </div>
    );
}

//um Card zu zentrieren 
const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
};