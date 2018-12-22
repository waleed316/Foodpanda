$(document).ready(function(){
    var order = [];
    var new_order = [];
    var confirm_order = [];
    var users = JSON.parse(localStorage.getItem("confirm-order") || "[]");
    var users1 = JSON.parse(localStorage.getItem("confirm-order1") || "[]");
    
    // if(users){
    //     confirm_order = users;
    //     console.log(confirm_order);
    // }
    // else if(users1){
    //     confirm_order = users1;
    //     console.log(users1);
    // }
    
    
    // Hide Cart Detail Section
    $('#cart_detail').hide();
    
    // Content Section Hide and Display
    $('a.link').on('click',function(e){
        e.preventDefault();
        var href = $(this).attr("href")
        
        const sections = document.querySelectorAll('.inner-content.active')
        Array.prototype.forEach.call(sections, function(section) {
            section.classList.remove('active')
        })
        
        if($(href).hasClass("active")){
            $(href).removeClass("active");
        }else{
            $(href).addClass("active");
        }
    })
    
    
    // Main Content Section Hide and Display
    $('a.menu').on('click',function(e){
        e.preventDefault();
        var href = $(this).attr("href")
        console.log(href);
        
        const sections = document.querySelectorAll('.row.none')
        Array.prototype.forEach.call(sections, function(section) {
            section.classList.remove('none')
        })
        
        if($(href).hasClass("none")){
            $(href).removeClass("none");
        }else{
            $(href).addClass("none");
        }
    })
    
    
    $("#output").on("click", ".close", function () {
        var tr = $('#output');
        var id = $(this).parents('tr').data('id');
        $(this).parents('tr').remove();
        // for (var i = new_order.length - 1; i >= 0; --i) {
        //     if (new_order[i].id == id) {
        //         new_order.splice(i,1);
        //     }
        // }
        
        new_order = new_order.filter(person => person.id != id);
        order = order.filter(person => person.id != id);
    });
    
    $('#output').on('click','tr',function(){
        var tot = $(this).find('input.tot');
        $(this).find('td').each (function( column, td) {
            if($(td).find('input.quantity')){
                $(this).on('change',function(){
                    var quantity = $(this).find('input.quantity').val()
                    var price = $(this).find('input.quantity').data('price');
                    var oi = quantity*price;
                    tot.val(oi)
                })
            }
        });
    })
    
    
    
    
    
    // $('.details').slideUp();
    
    // Add to cart button Event
    $('.cart-btn').on('click',function(e){
        e.preventDefault();
        var name = $(this).next().next().text();
        var img = $(this).attr('src');
        var price = $(this).next().data('price');
        var id = $(this).next().attr('id');
        var resturant_name = $(this).next().next().data('rname');
        var tr = $('#output');
        // $(this).next().next().next().attr('id','a'+id);
        // var grap = $(this).next().next().next().attr('id');
        // $('#a'+grap).slideUp(1000);
        // console.log(grap);
        $('html, body').animate({
            scrollTop: $("#cart_detail").top
        }, 1000);
        $('#cart_detail').show();
        order.push({"id":id,'resturant_name': resturant_name,"img":img,"name":name,"price":price});
        insert_subtotal(order);
        // console.log(order);
        
        tr.empty();
        $.each(new_order,function(key,value){
            tr.append(`
            <tr data-id="`+ value.id +`">
            <td data-r-name="`+value.resturant_name+`">`+ value.id +`</td>
            <td><img src="`+value.img+`" class="img-fluid" style="height:50px" ></td>
            <td data-price="`+value.price+`">`+ value.name +`</td>
            <td class="text-center"> <button class="minus" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" ></button>
            <input class="quantity" data-price="`+ value.price +`" min="1" value="1"  type="number">
            <button class="plus" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button></td>
            <td><a class="custom-btn btn btn-danger text-white" data-name="`+ value.name +`" data-toggle="modal" data-target="#exampleModal">Customize</a></td>
            <td><a class="close"><i class="fa fa-times"></i></a></td>
            </tr>                        
            `)
        })
        
        // $('#details').css({'height':'250px','z-index':'1'});
    })
    
    var custom = $('#custom');
    $('#carto').on('click','tr',function(){
        var num = $(this).find('input.quantity').val();
        var img = $(this).find('td').find('img').attr('src');
        var id = $(this).data('id');
        custom.empty();
        for(var i=1; i <= num; i++){
            custom.append(`
                <ul class="custome-screen">
                    <li data-id="`+ id +`"><img src="`+img+`" class="img-fluid custom-img mb-3"></li>
                    <li><h5 class="text-center">Cheese</h5></li>     
                    <li class="text-center">
                        <button class="minus" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" ></button>
                        <input class="quantity" id="chese" min="1" value="1"  type="number">
                        <button class="plus" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
                    </li>
                    <li class="mt-3"><h5 class="text-center">Lettuce</h5></li>     
                    <li class="text-center">
                        <button class="minus" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" ></button>
                        <input class="quantity" min="1" id="lettuce" value="1"  type="number">
                        <button class="plus" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
                    </li>
                    <li class="mt-3"><h5 class="text-center">Kabab</h5></li>     
                    <li class="text-center">
                        <button class="minus" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" ></button>
                        <input class="quantity" min="1" id="kabab" value="1"  type="number">
                        <button class="plus" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>
                    </li>           
                </ul>
            `)
        }
    })
   
    var detail = [];
    $('#done').on('click',function(){
        var cheese = $('#chese').val();
        var lettuce = $('#lettuce').val();
        var kabab = $('#kabab').val();
        detail .push({"cheese":cheese,"lettuce":lettuce,"kabab":kabab})        
        $('#exampleModal').modal('hide');
    })


    function changeDesc( value, desc ) {
        for (var i in confirm_order) {
            if (confirm_order[i].id == value) {
                confirm_order[i].push = {};
                break; //Stop this loop, we found it!
            }
        }
    }


    // Checkout button added
    $('#check').append(`
    <a id="continue" class="btn checkout-btn btn-success pull-right">Continue</a>
    <a id="ch" class="btn checkout-btn btn-success pull-right mr-2">Checkout</a>
    `)
    
    
    // Remove Duplicate orders in Order Array
    function insert_subtotal(array){
        $.each(order, function (i, e) {
            var matchingItems = $.grep(new_order, function (item) {
                return item.id === e.id && item.name === e.name;
            });
            if (matchingItems.length === 0){
                new_order.push(e);
            }
        });
    }
    
    
    // Checkout button event 
    $('#ch').on('click',function(){
        var subtotal = 0;
        if(users.length >= 1){
            confirm_order = users
        }
        $('#output tr').each(function(){
            var id;
            var res_name;
            var item;
            var quantity;
            var price;
            var total;
            $(this).find('td:eq(0)').each(function(){
                id = $(this).text();
                res_name = $(this).data('r-name');
            })
            // $(this).find('td:eq(1)').each(function(){
            //     // res_name = $(this).text();
            //     // console.log(res_name);
            // })
            $(this).find('td:eq(2)').each(function(){
                item = $(this).text();
                price = $(this).data('price');
                // console.log(item);                
            })
            $(this).find('td:eq(3)').each(function(){
                quantity = $(this).find('input').val();
            })
            // $(this).find('td:eq(4)').each(function(){
            // price = $(this).text();
            // console.log(price);                
            // })
            // $(this).find('td:eq(5)').each(function(){
            //     total = $(this).find('input').val();
            //     subtotal +=  parseInt(total);
            // })
            
            total = quantity*price;
            subtotal += parseInt(total)
            
            confirm_order.push({"id":id,"restaurant":res_name,"item":item,"quantity":quantity,"price":price,"total":total,"detail":detail})
            localStorage.setItem("confirm-order1", JSON.stringify(confirm_order));
        })
        if(confirm_order.length >= 0){
            window.location.replace("phone.php");
            $('#cart_detail').hide();
        }
        
        order = [];
        new_order = [];
    })
    
    
    $('#final').on('click',function(){
        if(users.length <= 0){
            alert(`You Didn't Order Anything`);
            console.log(users.length)
        }else{
            window.location.replace("cart.php")
            console.log(users.length)
        }
    })

    

    if(localStorage){
        var no = localStorage.getItem('name');
        var num = localStorage.getItem('num');
        $('#na').text(no);
        $('#no').text(num);
    }
    

    $('#next-bto').on('click',function(){
        var name = $('#namea').val();
        var num = $('#numbera').val();

        localStorage.setItem('name',name);
        localStorage.setItem('num',num);
        window.location.replace('cart.php');
       
    })

    
    $('#curr_date').text(GetTodayDate());
    $('#time').text(GetTodayTime());
    $('#serial_no').text('12345');
    $('#order_no').text('#10385');
   
        
    var display = $('#out');
    var rr =`
    <thead>
    <tr rowspan="1" style="background-color:lightgrey">
    <td colspan="7"><h6 class="text-center mb-0 py-1">Swift Me <span id="rn"></span></h6></td>
    </tr>
    <tr>
    <td>ID</td>
    <td>Name</td>
    <td>Item</td>
  
    <td align="center">Extra</td>
    <td>Price</td>
    <td>Total</td>
    <td></td>
    </tr>
    </thead>
    `   
    
    display.append(rr);
    var grand_total=0;
    console.log(users1);
    if(users1.length >= 1){
        confirm_order = users1;
    }
    var kabab;
    var cheese;
    var lettuce;
    console.log(confirm_order);
    $.each(confirm_order, function (key, value1) {
        if (value1) {
            $.each(value1.details, function (k, v) {
                console.log(v);
                cheese = v.cheese;
                lettuce = v.lettuce;
                kabab = v.kabab;
                
            })
            display.append(`
                    <tr>
                    <td>` + value1.id + `</td>
                    <td>` + value1.restaurant + `</td>
                    <td>` + value1.item + `</td>
                    <td align="center"> Cheese ` + cheese + ` Lettuce ` + lettuce + ` Kabab ` + kabab + `</td>
                    <td>` + value1.price + `</td>
                    <td>` + value1.total + `</td>
                    </tr>
                `)
            grand_total += value1.total;
        }
    })
    
    display.append(`
    <tr rowspan="1">
    <td colspan="5" align="right"><b>Grand Total</b></td>
    <td colspan="2" align="center"><b>`+ grand_total +`</b></td>
    `)
    
    var button = $('#butt');
    button.append(`
    <a id="cancel" class="btn btn-danger text-white btn-lg text-right">Cancel</a>
    <a id="conf" class="btn btn-success text-white btn-lg text-right">Confirm</a>
    `)
    
    $('#cancel').on('click',function(){
        window.localStorage.removeItem('confirm-order');
        window.localStorage.removeItem('confirm-order1');
        window.location.replace('second_page.php');
    })
    
    
    $('#conf').on('click',function(){
        alert('Thank You For Odering')
        window.localStorage.removeItem('confirm-order');
        window.localStorage.removeItem('confirm-order1');
        window.location.replace('index.php');
        // localStorage.clear();
    })
    
    
    // Continue Event
    $('#continue').on('click',function(){
        var subtotal = 0;
        if(users.length >= 1){
            confirm_order = users
        }
        $('#output tr').each(function(){
            var id;
            var res_name;
            var item;
            var quantity;
            var price;
            var total;
            $(this).find('td:eq(0)').each(function(){
                id = $(this).text();
                res_name = $(this).data('r-name');
            })
            // $(this).find('td:eq(1)').each(function(){
            //     // res_name = $(this).text();
            //     // console.log(res_name);
            // })
            $(this).find('td:eq(2)').each(function(){
                item = $(this).text();
                price = $(this).data('price');
                // console.log(item);                
            })
            $(this).find('td:eq(3)').each(function(){
                quantity = $(this).find('input').val();
            })
            // $(this).find('td:eq(4)').each(function(){
            // price = $(this).text();
            // console.log(price);                
            // })
            // $(this).find('td:eq(5)').each(function(){
            //     total = $(this).find('input').val();
            //     subtotal +=  parseInt(total);
            // })
            
            total = quantity*price;
            subtotal += parseInt(total);
            
            confirm_order.push({"id":id,"restaurant":res_name,"item":item,"quantity":quantity,"price":price,"total":total,"details":detail})
            localStorage.setItem("confirm-order", JSON.stringify(confirm_order));
            
        })
        if(confirm_order.length >= 0){
            window.location.replace("second_page.php");
            // alert(users.length);
            if(users.length >= 1){
                confirm_order = users
            }
        }
    })
    
    function GetTodayDate() {
        var tdate = new Date();
        var dd = tdate.getDate(); //yields day
        var MM = tdate.getMonth(); //yields month
        var yyyy = tdate.getFullYear(); //yields year
        
        var currentDate= dd + "-" +( MM+1) + "-" + yyyy ;
        
        return currentDate;
    }
    
    function GetTodayTime() {
        var tdate = new Date();
        var hours = tdate.getHours();
        var minute = tdate.getMinutes();
        var second = tdate.getSeconds();
        
        var currentDate= hours +':'+minute+':'+second;
        
        return currentDate;
    }
    
    $('#list').slimscroll({
        height: '500px',
        size: '5px',
        // position: 'right',
        // color: '#ffcc00',
        alwaysVisible: false,
        distance: '0',
        // railVisible: true,
        railColor: '#222',
        // railOpacity: 0.1,
        wheelStep: 5,
        allowPageScroll: false,
        disableFadeOut: true
    });
})