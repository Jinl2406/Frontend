<?php
$host = 'localhost';
$port = '5435';
$dbname = 'usuarios';
$user = 'postgres';
$password = '113355';

$conexion = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
    if (!$conexion) {
    echo "Error al conectar a la base de datos.";
    exit;
}

$query = "SELECT * FROM usuarios";
$resultado = pg_query($conexion, $query);
if (!$resultado) {
    echo "Error al ejecutar la consulta SELECT.";
    exit;
}


$datos = pg_fetch_all($resultado);


pg_close($conexion);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabla</title>
    
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../adminLTE/plugins/fontawesome-free/css/all.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="../adminLTE/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="../adminLTE/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
  <link rel="stylesheet" href="../adminLTE/plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../adminLTE/dist/css/adminlte.min.css">
</head>
<body>
<div class="card">
    <div class="card-header">
      <h3 class="card-title">DataTable</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <table id="example1" class="table table-bordered table-striped">
        <thead>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Contraseña</th>
        </tr>
        </thead>
        <tbody>
          <?php foreach ($datos as $fila): ?>
        <tr>
            <td><?php echo $fila['id']; ?></td>
            <td><?php echo $fila['email']; ?></td>
            <td><?php echo $fila['contraseña']; ?></td>
        </tr>
        <?php endforeach; ?>
        </tbody>
        <tfoot>
        <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Contraseña</th>
        </tr>
        </tfoot>
      </table>
    </div>
    <!-- /.card-body -->
  </div>

  <!-- jQuery -->
<script src="../adminLTE/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="../adminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- DataTables  & Plugins -->
<script src="../adminLTE/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="../adminLTE/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="../adminLTE/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="../adminLTE/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="../adminLTE/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
<script src="../adminLTE/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
<script src="../adminLTE/plugins/jszip/jszip.min.js"></script>
<script src="../adminLTE/plugins/pdfmake/pdfmake.min.js"></script>
<script src="../adminLTE/plugins/pdfmake/vfs_fonts.js"></script>
<script src="../adminLTE/plugins/datatables-buttons/js/buttons.html5.min.js"></script>
<script src="../adminLTE/plugins/datatables-buttons/js/buttons.print.min.js"></script>
<script src="../adminLTE/plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
<!-- AdminLTE App -->
<script src="../adminLTE/dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../adminLTE/dist/js/demo.js"></script>
<!-- Page specific script -->
<script>
  $(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "responsive": true,
    });
  });
</script>
</body>
</html>



