# `Slider`

#### `loads`

```html
<div id="labelContainer">
    <label for="input" id="label"></label>
    <div aria-labelledby="label" aria-readonly="true" id="value" role="textbox">
        10
    </div>
</div>
<div id="controls">
    <div
        class="track"
        id="track-left"
        role="presentation"
        style="width: 50%"
    ></div>
    <div id="handle" role="presentation" style="left: 50%">
        <input
            aria-disabled="false"
            aria-label=""
            aria-valuemax="20"
            aria-valuemin="0"
            aria-valuetext="10"
            id="input"
            max="20"
            min="0"
            step="1"
            type="range"
            value="10"
        />
    </div>
    <div
        class="track"
        id="track-right"
        role="presentation"
        style="width: 50%; left: calc(50% + 8px)"
    ></div>
</div>
```

#### `loads - [variant="color"]`

```html
<div id="labelContainer">
    <label for="input" id="label"></label>
    <div aria-labelledby="label" aria-readonly="true" id="value" role="textbox">
        10
    </div>
</div>
<div id="controls">
    <div class="track"></div>
    <div id="handle" role="presentation" style="left: 50%">
        <input
            aria-disabled="false"
            aria-label=""
            aria-valuemax="20"
            aria-valuemin="0"
            aria-valuetext="10"
            id="input"
            max="20"
            min="0"
            step="1"
            type="range"
            value="10"
        />
    </div>
</div>
```

#### `loads - [variant="tick"]`

```html
<div id="labelContainer">
    <label for="input" id="label"></label>
    <div aria-labelledby="label" aria-readonly="true" id="value" role="textbox">
        0
    </div>
</div>
<div id="controls">
    <div
        class="track"
        id="track-left"
        role="presentation"
        style="width: 50%"
    ></div>
    <div class="ticks">
        <div class="tick">
            <div class="tickLabel">
                0
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                1
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                2
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                3
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                4
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                5
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                6
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                7
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                8
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                9
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                10
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                11
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                12
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                13
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                14
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                15
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                16
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                17
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                18
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                19
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                20
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                21
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                22
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                23
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                24
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                25
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                26
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                27
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                28
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                29
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                30
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                31
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                32
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                33
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                34
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                35
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                36
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                37
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                38
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                39
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                40
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                41
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                42
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                43
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                44
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                45
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                46
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                47
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                48
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                49
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                50
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                51
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                52
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                53
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                54
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                55
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                56
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                57
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                58
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                59
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                60
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                61
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                62
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                63
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                64
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                65
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                66
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                67
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                68
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                69
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                70
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                71
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                72
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                73
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                74
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                75
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                76
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                77
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                78
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                79
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                80
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                81
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                82
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                83
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                84
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                85
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                86
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                87
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                88
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                89
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                90
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                91
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                92
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                93
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                94
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                95
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                96
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                97
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                98
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                99
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                100
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                101
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                102
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                103
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                104
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                105
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                106
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                107
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                108
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                109
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                110
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                111
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                112
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                113
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                114
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                115
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                116
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                117
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                118
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                119
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                120
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                121
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                122
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                123
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                124
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                125
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                126
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                127
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                128
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                129
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                130
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                131
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                132
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                133
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                134
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                135
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                136
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                137
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                138
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                139
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                140
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                141
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                142
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                143
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                144
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                145
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                146
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                147
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                148
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                149
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                150
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                151
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                152
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                153
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                154
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                155
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                156
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                157
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                158
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                159
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                160
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                161
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                162
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                163
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                164
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                165
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                166
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                167
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                168
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                169
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                170
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                171
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                172
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                173
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                174
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                175
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                176
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                177
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                178
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                179
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                180
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                181
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                182
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                183
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                184
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                185
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                186
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                187
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                188
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                189
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                190
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                191
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                192
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                193
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                194
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                195
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                196
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                197
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                198
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                199
            </div>
        </div>
        <div class="tick">
            <div class="tickLabel">
                200
            </div>
        </div>
    </div>
    <div id="handle" role="presentation" style="left: 50%">
        <input
            aria-disabled="false"
            aria-label=""
            aria-valuemax="100"
            aria-valuemin="-100"
            aria-valuetext="0"
            id="input"
            max="100"
            min="-100"
            step="1"
            type="range"
            value="0"
        />
    </div>
    <div
        class="track"
        id="track-right"
        role="presentation"
        style="width: 50%; left: calc(50% + 8px)"
    ></div>
</div>
```
