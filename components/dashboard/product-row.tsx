"use client";

import React from "react";
import type { Product } from "@/lib/types";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatDate } from "@/lib/utils";
import { MoreVertical, Edit, Trash2, Power, PowerOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface ProductRowProps {

  product: Product;

  menuOpen:boolean;

  onOpenMenu:()=>void;

  onCloseMenu:()=>void;

  onToggleStatus:(id:number,currentActive:boolean)=>void;

  onDelete:(id:number,name:string)=>void;
}



export const ProductRow = React.memo(
function ProductRow({
  product,
  menuOpen,
  onOpenMenu,
  onCloseMenu,
  onToggleStatus,
  onDelete

}:ProductRowProps){


return (

<tr className="
 bg-white
 hover:bg-gray-50/50
 transition-colors
">


<td className="px-4 py-3">

<div className="flex items-center gap-3">


{
product.imagenes?.[0]?.url
?
<Image
src={product.imagenes[0].url}
alt={product.nombre}
width={40}
height={40}
className="h-10 w-10 rounded-lg object-cover"
/>

:

<div className="
h-10
w-10
rounded-lg
bg-gray-100
"
/>

}


<div className="min-w-0">

<p className="
text-sm
font-medium
truncate
max-w-[180px]
">
{product.nombre}
</p>


<p className="
text-xs
text-dashboard-text-secondary
truncate
max-w-[180px]
">
{product.marca || "Sin marca"}
</p>


</div>


</div>

</td>



<td className="hidden md:table-cell px-4 py-3">
<span className="text-sm">
{product.categoria}
</span>
</td>



<td className="hidden sm:table-cell px-4 py-3">
<span className="text-sm">
{formatDate(product.created_at)}
</span>
</td>



<td className="px-4 py-3">

<StatusBadge
status={
product.activo
?"active"
:"inactive"
}
/>

</td>



<td className="px-4 py-3">


<div className="relative">


<button
type="button"
onClick={onOpenMenu}
className="
flex
h-8
w-8
items-center
justify-center
rounded-lg
hover:bg-gray-100
"
>
<MoreVertical size={16}/>
</button>



{
menuOpen && (

<div
className="
absolute
right-0
top-10
z-50
w-44
rounded-xl
border
bg-white
shadow-lg
py-1
"
>


<Link
href={`/dashboard/productos/${product.id}/editar`}
onClick={onCloseMenu}
className="
flex
items-center
gap-2
px-3
py-2
text-sm
hover:bg-gray-50
"
>

<Edit size={14}/>
Editar

</Link>



<button
onClick={()=>{
onToggleStatus(
product.id,
product.activo
);
onCloseMenu();
}}
className="
flex
w-full
items-center
gap-2
px-3
py-2
text-sm
hover:bg-gray-50
"
>

{
product.activo
?
<>
<PowerOff size={14}/>
Desactivar
</>
:
<>
<Power size={14}/>
Activar
</>
}


</button>



<button
onClick={()=>{
onDelete(
product.id,
product.nombre
);
onCloseMenu();
}}
className="
flex
w-full
items-center
gap-2
px-3
py-2
text-sm
text-red-600
hover:bg-red-50
"
>

<Trash2 size={14}/>
Eliminar

</button>


</div>

)

}


</div>


</td>


</tr>

);

},
(prev,next)=>
prev.product === next.product &&
prev.menuOpen === next.menuOpen
);