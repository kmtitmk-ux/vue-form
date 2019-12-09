<?php
    save();
    function save()
    {
        if ($_SERVER["REQUEST_METHOD"] == 'POST') {

            //配列の整理
            $data = [];
            foreach ($_POST['route'] as $date => $detail) {
                $detail_array = [];
                foreach ($detail as $k => $v) {
                    $detail_array[] = [
                        'id' => $k,
                        'time' => $v['time'],
                        'place' => $v['place'],
                    ];
                }
                unset($k, $v);

                $data[] = [
                    'date' => $date,
                    'detail' => $detail_array
                ];
            }
            unset($v);

            //json保存
            $data = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            $json = fopen('./data/save.json', 'w+b');
            fwrite($json, $data);
            fclose($json);
        }
    }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div class="row justify-content-center mt-3">
        <div class="col-8">
            <form class="row" action="<?php print $_SERVER['SCRIPT_NAME']; ?>" method="post">
                <div id="app" class="col-12">
                    <div class="form-group col-12 mb-5">
                        <label>予定日</label>
                        <div class="row justify-content-between">
                            <flat-pickr
                                @on-change="change_date('start', $event)"
                                :config="config"
                                v-model="start"
                                class="form-control col-5" 
                                placeholder="開催日を選択してください"
                                name="period[]">
                            </flat-pickr>
                            <flat-pickr
                                @on-change="change_date('end', $event)"
                                :config="config"
                                v-model="end"
                                class="form-control col-5" 
                                placeholder="終了日を選択してください"
                                name="period[]">
                            </flat-pickr>
                            <span class="col-1"></span>
                        </div>
                        <p v-html="date_error">&nbsp;</p>
                    </div>
                    <date-field
                        v-for="item in route_input"
                        v-bind:todo="item"
                        v-bind:key="item.id"
                    ></date-field>
                    <div class="row justify-content-center">
                        <button type="submit" class="btn btn-primary">保存</button>
                    </div>
                </div>
            </form>
        </div>
    </div>


    <?php 
        //json取得
        if (file_exists('./data/save.json')) {
            $data = file_get_contents('./data/save.json');
        } else {
            $data = '[]';
        }
        printf('<script> let data_array = %s </script>', $data);
    ?>
    <script src="/js/app.js"></script>
</body>
</html>