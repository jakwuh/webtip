docker pull ubuntu:16.10
docker run -ti ubuntu:16.10 /bin/bash

apt-get update
apt-get install -y git curl python
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
export PATH=`pwd`/depot_tools:"$PATH"
gclient
fetch v8
