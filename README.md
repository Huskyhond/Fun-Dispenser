# Fun-Dispenser


**Raspberry setup**

C library required for Broadcom 2835:
    wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.35.tar.gz
    tar -zxf bcm2835-1.35.tar.gz
    cd bcm2835-1.35
    ./configure	
    sudo make install

npm modules required:
    npm install --save rc522-rfid