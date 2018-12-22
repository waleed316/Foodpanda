<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include './directory/header.php' ?>
  </head>
  <body class="cart">
    <section class="cart-o">
        <h1 class="cart-heading text-center text-white mt-3">Confirm Order</h1>
        <div class="checking">
          <h4 class="text-center">
            <img src="dist/img/Swift-ME.png" class="logo-8" alt="">
          </h4>
          <div class="row">
            <div class="col-xl-4">
              <h6 class="serial-no ">Serial No: <span id="serial_no"></span></h6>
              <h6 class="serial-no">Order : <span id="order_no"></span></h6>
              <h6 class="serial-no">Estimate Time: <span>12 Min</span></h6>
              <!-- <h6 class="serial-no">: <span>12 Min</span></h6> -->
            </div>
            <div class="col-xl-4">
                <h6 class="name text-center">Name: <span class="na" id="na"></span></h6>
                <h6 class="name text-center">Number: <span class="no" id="no"></span></h6>
            </div>
            <div class="col-xl-4">
              <h6 class="serial-no text-right">Date : <span id="curr_date"></span></h6>
              <h6 class="serial-no text-right">Time : <span id="time"></span></h6>
            </div>
          </div>
          <hr>
          <table id="out" class="table table-sm">

          </table>
          <div class="text-center" id="butt">
          <h3 class="text-center">Thank You</h3>
            
          </div>
        </div>
    </section>
   <?php include './directory/footer.php'?>
  </body>
</html>