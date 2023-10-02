<?php
$time = microtime(true);

try {
    $x = $_POST["x"];
    $y = $_POST["y"];
    $r = $_POST["r"];
    $result = "Промах";
    preg_match('/^\-?\d+$/', $x, $matches);
    if (count($matches) == 1 && $matches[0] == $x) {
        $x = (float)$x;
    } else {
        exit("X должен принадлежать [-4, -3, -2, -1, 0, 1, 2, 3, 4]");
    }

    preg_match('/^\-?\d+\.?\d{0,}$/', $y, $matches);
    if (count($matches) == 1 && $matches[0] == $y) {
        $y = (float)$y;
    } else {
        exit("Y должен быть числом");
    }

    preg_match('/^\-?\d+\.?\d{0,}$/', $r, $matches);
    if (count($matches) == 1 && $matches[0] == $r) {
        $r = (float)$r;

        if ($r <= 0) {
            exit("R должен быть больше 0");
        }
    } else {
        exit("R должен быть числом");
    }
} catch (Exception $e) {
    exit($e);
}

if (($x >= 0 && $y >= 0 && ($r / 2) ** 2 - $x ** 2 - $y ** 2 >= 0) || ($x <= 0 && $y >= 0 && $x >= -$r && $y <= $r)
    || ($x >= 0 && $y <= 0 && $x <= $r / 2 && $y >= $x * 2 - $r)) {
    $result = "Попадание";
}

$nowTime = date('Y-m-d H:i');
echo "<tr>";
echo "<td class='phpGenerate'>$x</td>";
echo "<td class='phpGenerate'>$y</td>";
echo "<td class='phpGenerate'>$r</td>";
echo "<td class='phpGenerate'>$result</td>";
echo "<td class='phpGenerate'>$nowTime</td>";

$executeTime = round(microtime(true) - $time, 12);
echo "<td class='phpGenerate'>$executeTime</td>";
echo "</tr>";

