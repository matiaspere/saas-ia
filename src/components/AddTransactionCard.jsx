import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectCoins from "./SelectCoins";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "./ui/use-toast";
import { useForm } from "react-hook-form";

const AddTransactionCard = ({ coins, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();

  const [selectedCoin, setSelectedCoin] = useState("");
  const [type, setType] = useState("buy");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [errorCoin, setErrorCoin] = useState();

  const createOrder = handleSubmit(async (data) => {
    const userId = 1;

    const orderData = {
      type: type,
      coin: selectedCoin,
      quantity: data.quantity,
      price: data.price,
      email: session.user.email,
    };

    try {
      const response = await fetch(`/api/orders?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast({
          title: "Transacción agregada correctamente",
        });
        setIsOpen(false);
      } else {
        console.error("Failed to create order");
        toast({
          title: "Error al crear orden",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  });

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  return (
    <Tabs defaultValue="buy" className="w-[450px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="buy"
          onClick={() => {
            setType("buy");
          }}
        >
          Comprar
        </TabsTrigger>
        <TabsTrigger
          value="sell"
          onClick={() => {
            setType("sell");
          }}
        >
          Vender
        </TabsTrigger>
      </TabsList>

      {/* Compra */}
      <TabsContent value="buy">
        <Card>
          <CardHeader>
            <CardTitle>Agregar compra</CardTitle>
            <CardDescription>Elige la moneda</CardDescription>
            <SelectCoins
              className="w-[550px]"
              coins={coins}
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
            />
            {errors.coin && (
              <span className="text-red-500 font-bold text-xs">
                {errors.coin.message}
              </span>
            )}
          </CardHeader>
          <CardContent className="space-y-2">
            <CardDescription>Elige la cantidad y el precio</CardDescription>
            <div className="flex align-middle justify-between">
              <div>
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                  id="quantity"
                  placeholder="12"
                  onChange={handleQuantity}
                  name="quantity"
                  {...register("quantity", {
                    required: "Debes seleccionar la cantidad",
                  })}
                />
                {errors.quantity && (
                  <span className="text-red-500 font-bold text-xs">
                    {errors.quantity.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  placeholder="$34.523"
                  onChange={handlePrice}
                  name="price"
                  {...register("price", {
                    required: "Debes seleccionar el precio",
                  })}
                />
                {errors.price && (
                  <span className="text-red-500 font-bold text-xs">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={createOrder} className="w-full">
              Agregar transacción
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Venta */}
      <TabsContent value="sell">
        <Card>
          <CardHeader>
            <CardTitle>Agregar venta</CardTitle>
            <CardDescription>Elige la moneda</CardDescription>
            <SelectCoins
              className="w-[550px]"
              coins={coins}
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
            />
          </CardHeader>
          <CardContent className="space-y-2">
            <CardDescription>Elige la cantidad y el precio</CardDescription>
            <div className="flex align-middle justify-between">
              <div>
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                  id="quantity"
                  placeholder="12"
                  onChange={handleQuantity}
                />
              </div>
              <div>
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  placeholder="$34.523"
                  onChange={handlePrice}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={createOrder} className="w-full">
              Agregar transacción
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AddTransactionCard;
