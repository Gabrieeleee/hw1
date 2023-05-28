<?php 


$curl = curl_init();
if(!empty($_GET['page']))
curl_setopt($curl,CURLOPT_URL,"https://newsdata.io/api/1/news?country=it&language=it&apikey=pub_22406d6952380f0400a9906ecf6510f524724&page=".$_GET['page']);
else
curl_setopt($curl,CURLOPT_URL,"https://newsdata.io/api/1/news?country=it&language=it&apikey=pub_22406d6952380f0400a9906ecf6510f524724");

curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec($curl);

echo ($result);
curl_close($curl);


?>
