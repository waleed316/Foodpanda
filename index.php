<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include './directory/header.php' ?>
  </head>
  <body>
    <section class="video-tag">
        <video autoplay muted loop id="myVideo">
            <source src="dist/video/video.mkv">
        </video>
        <div class="bottom-proceed">
            <div class="row">
                <div class="col-xl-5">
                    <img src="dist/img/Swift-ME.png" alt="">
                </div>

                <div class="col-xl-7">
                    <div class="text">
                        <a href="second_page.php" class="btn btn-success btn-lg">Click to Proceed</a>
                        <!-- <a href="second_page.php" class="btn btn-success btn-lg">Click to Proceed</a> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
   <?php include './directory/footer.php'?>
  </body>
</html>