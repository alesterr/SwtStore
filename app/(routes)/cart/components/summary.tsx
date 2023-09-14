"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { product } from "@/constants";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);


  const maillink = 'mailto:theonlyswt@gmail.com?subject=ENQUIRY FOR - '+ items.map((item) => ( '%20'+ item.name )) + '&body=Hello, I am sending enquiry for : %0D%0A %0D%0A ---------------------------------------------  %0D%0A' + items.map((item, index) => (
    '|' +(index+1) +'| Color : ' + item.color?.name +'%20 | %20 Size : '+ item?.size.name+ '%0D%0A     >> '+ item.name + ' %0D%0A            |'+''+ item?.price +' (د.إ)AED |')+'%0D%0A') + '%0D%0A ---------------------------------------------  %0D%0A My Total Cart is : (د.إ)AED ' + `${totalPrice}` + '/- %0D%0A ---------------------------------------------  %0D%0A%0D%0A Thank You!';
  




 
   
  // const onCheckout = async () => {
  //   const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
  //     productIds: items.map((item) => item.id)
  //   });

  //   window.location = response.data.url;

    
  // }

  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <a href={maillink}>
      <Button  disabled={items.length === 0} className="w-full mt-6">
        Initiate Enquiry
      </Button>
      

      </a>

      


      {/* <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button> */}
    </div>
  );
}
 
export default Summary;
