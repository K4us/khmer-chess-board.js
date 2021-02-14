/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/

'use strict';

const AUDIO = {
   move: 'data:audio/mpeg;base64,SUQzAwAAAAA8HFRZRVIAAAAGAAAAMjAxOABUREFUAAAABgAAADAyMTEAVElNRQAAAAYAAAAxNjQ0AFBSSVYAABXiAABYTVAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwMzAyLCAyMDE3LzAzLzAyLTE2OjU5OjM4ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpiZXh0PSJodHRwOi8vbnMuYWRvYmUuY29tL2J3Zi9iZXh0LzEuMC8iCiAgICB4bWxuczpjcmVhdG9yQXRvbT0iaHR0cDovL25zLmFkb2JlLmNvbS9jcmVhdG9yQXRvbS8xLjAvIgogICAgeG1sbnM6eG1wRE09Imh0dHA6Ly9ucy5hZG9iZS5jb20veG1wLzEuMC9EeW5hbWljTWVkaWEvIgogICB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIEF1ZGl0aW9uIENDIDIwMTcuMSAoV2luZG93cykiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTExLTAyVDE2OjQ0OjE2KzAzOjAwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTExLTAyVDE2OjQ4OjUyKzAzOjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMS0wMlQxNjo0ODo1MiswMzowMCIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkY2I5MDA5MS1kZTg2LTlmNDQtYjc1Ni1hZGU2ZWU5ZjkwODgiCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZGNiOTAwOTEtZGU4Ni05ZjQ0LWI3NTYtYWRlNmVlOWY5MDg4IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Zjc3OTNjY2YtMzhhMy05NjQ3LWFhZTUtYTBhZjk1YWM4N2JlIgogICBkYzpmb3JtYXQ9ImF1ZGlvL21wZWciCiAgIGJleHQ6b3JpZ2luYXRpb25EYXRlPSIyMDE4LTExLTAyIgogICBiZXh0Om9yaWdpbmF0aW9uVGltZT0iMTY6NDU6MjYiCiAgIGJleHQ6dGltZVJlZmVyZW5jZT0iMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmY3NzkzY2NmLTM4YTMtOTY0Ny1hYWU1LWEwYWY5NWFjODdiZSIKICAgICAgc3RFdnQ6d2hlbj0iMjAxOC0xMS0wMlQxNjo0NDoxNyswMzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgQXVkaXRpb24gQ0MgMjAxNy4xIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwZTZjYjE1LTg4ODEtOTg0NS05NzUyLTZkODlhNTI4MzUwMSIKICAgICAgc3RFdnQ6d2hlbj0iMjAxOC0xMS0wMlQxNjo0ODo1MiswMzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgQXVkaXRpb24gQ0MgMjAxNy4xIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIKICAgICAgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi94bWwgdG8gYXVkaW8vbXBlZyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjOGEyN2I3Yi1iMjgyLTQxNDQtOTQ3ZS05MjUzYWMyOTQ4YzgiCiAgICAgIHN0RXZ0OndoZW49IjIwMTgtMTEtMDJUMTY6NDg6NTIrMDM6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIEF1ZGl0aW9uIENDIDIwMTcuMSAoV2luZG93cykiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIgogICAgICBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3htbCB0byBhdWRpby9tcGVnIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmRjYjkwMDkxLWRlODYtOWY0NC1iNzU2LWFkZTZlZTlmOTA4OCIKICAgICAgc3RFdnQ6d2hlbj0iMjAxOC0xMS0wMlQxNjo0ODo1MiswMzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgQXVkaXRpb24gQ0MgMjAxNy4xIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDx4bXBNTTpEZXJpdmVkRnJvbQogICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjOGEyN2I3Yi1iMjgyLTQxNDQtOTQ3ZS05MjUzYWMyOTQ4YzgiCiAgICBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmM4YTI3YjdiLWIyODItNDE0NC05NDdlLTkyNTNhYzI5NDhjOCIKICAgIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNzc5M2NjZi0zOGEzLTk2NDctYWFlNS1hMGFmOTVhYzg3YmUiLz4KICAgPGNyZWF0b3JBdG9tOndpbmRvd3NBdG9tCiAgICBjcmVhdG9yQXRvbTpleHRlbnNpb249Ii5zZXN4IgogICAgY3JlYXRvckF0b206aW52b2NhdGlvbkZsYWdzPSItRU8iCiAgICBjcmVhdG9yQXRvbTp1bmNQcm9qZWN0UGF0aD0iQzpcVXNlcnNc0JjQvNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xEb2N1bWVudHNcQWRvYmVcQXVkaXRpb25cMTAuMFx3ZXJoZ0Vcd2VyaGdFLnNlc3giLz4KICAgPGNyZWF0b3JBdG9tOm1hY0F0b20KICAgIGNyZWF0b3JBdG9tOmFwcGxpY2F0aW9uQ29kZT0iMTA5NzA4OTM5NyIKICAgIGNyZWF0b3JBdG9tOmludm9jYXRpb25BcHBsZUV2ZW50PSIxMTY0MjAxODQyIi8+CiAgIDx4bXBETTpUcmFja3M+CiAgICA8cmRmOkJhZz4KICAgICA8cmRmOmxpCiAgICAgIHhtcERNOnRyYWNrTmFtZT0iQ3VlUG9pbnQgTWFya2VycyIKICAgICAgeG1wRE06dHJhY2tUeXBlPSJDdWUiCiAgICAgIHhtcERNOmZyYW1lUmF0ZT0iZjQ4MDAwIi8+CiAgICAgPHJkZjpsaQogICAgICB4bXBETTp0cmFja05hbWU9IkNEIFRyYWNrIE1hcmtlcnMiCiAgICAgIHhtcERNOnRyYWNrVHlwZT0iVHJhY2siCiAgICAgIHhtcERNOmZyYW1lUmF0ZT0iZjQ4MDAwIi8+CiAgICAgPHJkZjpsaQogICAgICB4bXBETTp0cmFja05hbWU9IlN1YmNsaXAgTWFya2VycyIKICAgICAgeG1wRE06dHJhY2tUeXBlPSJJbk91dCIKICAgICAgeG1wRE06ZnJhbWVSYXRlPSJmNDgwMDAiLz4KICAgIDwvcmRmOkJhZz4KICAgPC94bXBETTpUcmFja3M+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5DAAAAScN0hNayAAgcU6is48AIQBZVFqoyotNYxx4zxAgFmrinVsnLRgBgff+fm+b82DQhmkhpDgCQKGmJGnlgdkRpANZXfB7KFiSZrDiWM9SiMRi9UsYYYYYYYd/8P/ffzzz/9YfnSWOZ56w5nSWOZ56ww3GKTmfcKSxukpOb7rDDdJh+f4YYbpLA1QIFDkQHCH5TwwUxA4MYYKOlHBjDBR0o45UGEJFQAVSSU0qpk6pQ4AmBRoPAtIxAYlsc8fR5MQmLDeYXJqbsTM2GgOGplYPmAAVBTRg3VECMl1HZ1iLIywjmVMWKjImNDOU15GqHWyglngarBri2N7/j59843Tfz8Yt/itZKxT06ygSpCQlDgLGBa5EBDpg17PUi2lFyLkK+qq+RkQLQEsQAAAuYAACkp1ySXW2yNuJGgIIGipqiqoKLFWGbCgmNrDOIxkBQnWWkWyLTAgZqaaAoKpIr6RWac+MHhYIGK8kbLmmIKzWMgUxnAgs06nf2w4S7or+Oq1rHn/9Wl5//lvH/5/445Zd/eqamtbxx1WyQITsH/+5DANgAQMK9HvYwAMAAAJcAAAASj0Gng0DIay3I6fwZd/8qHfOwaPcGg/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5DAuwAgYAEuAAAAIAAAJcAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUQUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMDE4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
   capture: 'data:audio/mpeg;base64,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',
   check: 'data:audio/mpeg;base64,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'
};

module.exports = { AUDIO };
