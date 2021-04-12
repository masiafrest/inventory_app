1. elegir cliente
2. enviar cliente id para buscar recibo venta id
3. buscar el item a devolver en linea_venta con la venta id y el item_Id
   1. buscar en recibo devolucion donde es del cliente id
   2. buscar en linea devolucion con los recibo devoucion id y item id
4. retornar los datos de linea_venta encontrado para elegir q item_id quiere devolver
   1. los datos retornado de venta y devolucion se resta la qty para no poder hacer otra devolucion de item q ya se a devultoen venta
   2. mostrando en la lista item 7 qty, 3 devuelto, no debe sobrepasar los 7 que compro
5. aparece una select list de los item de linea venta para seleccionar y agregar a al tabla
6. en la tabla aparece el item seleccionado a devolver, la col de la tabla:
   1. col qty a devolver, no deb ser mas de lo q compro
   2. col motivo de por q lo va a devolver, col descripcion del item,
   3. col descripcion del item a devover
   4. col venta_id (en pantalla grande o toda la screen talvez)
   5. col de tipo de devolucion: refund, otro item, mismo item
   6. mismo item:
      1. no aparece nada, para mostrar se entiende q es el mismo item en el backend
   7. otro item:
      1. aparece un select list en un cuadro separado para seleccionar q item se va a cambiar
      2. si precio es igual no se hace mas cosa
      3. precio item a cambiar es mayor multiplicado con la qty, elige una o varias opciones:
      4. no se puede ser mayor, demasiado complicado con los impuesto
      5. precio item a cambiar es menor multiplicado con la qty, elige una o varias opciones:
      6. otro item que sea menor al sobrante
      7. no hay item precio menor al sobrante se iria a nota credito,
   8. refund:
      1. hacer nota credito
   9. nota credito: se hace en la misma pantalla mas abajo solo aparece al usar refund y otro item opciones:
      1. tiene tabla con las siguiente col:
         1. col venta id(nullable) y devolucion id(notNullable porq para nota de credito siempre hay una devolucion)
         2. col valor del total de los item devuelto
