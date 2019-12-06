<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
    <title>Document</title>
</head>
<body>
    <div class="row justify-content-center mt-3">
        <div class="col-8">
            <form class="row">
                <div id="app" class="col-12">
                    <div class="row d-flex justify-content-between form-group mb-3">
                        <date-field
                            v-for="item in route_input"
                            v-bind:todo="item"
                            v-bind:key="item.id"
                        ></date-field>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <?php
        $data = [
            [
                'date' => 1,
                'detail' => [
                    [
                        'id' => 0,
                        'time' => '10:00',
                        'place' => 'テキスト1',
                    ],
                    [
                        'id' => 1,
                        'time' => '11:00',
                        'place' => 'テキスト2',
                    ],
                    [
                        'id' => 2,
                        'time' => '12:00',
                        'place' => 'テキスト3',
                    ]
                ]
            ],
            [
                'date' => 2,
                'detail' => [
                    [
                        'id' => 0,
                        'time' => '10:00',
                        'place' => 'テキスト1',
                    ]
                ]
            ]
        ];
        printf('<script> var data_array = %s </script>', json_encode($data)) ;
    ?>

    <div id="test">
        <form>
            <input type="text" v-model="start" v-on:change="start_change($event)">
            <input type="text" v-model="end" v-on:change="end_change($event)">
        </form>

        {{ period }}
    </div>

    <script src="/js/app.js"></script>
</body>
</html>