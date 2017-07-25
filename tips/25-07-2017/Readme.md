**Task:** log all tcp packets to a specific destination (i.e. see which http requests our node app sends)  

**Solution:**
```bash
> host yandex.ru # find out ipv4 & ipv6 adresses for the destination hostname

collections.yandex.ru has address 87.250.250.29
collections.yandex.ru has IPv6 address 2a02:6b8::3:29
```

```bash
> tcpdump dst host 87.250.250.29 -vv
```

The command will print out all tcp packets to the specified host.  
To filter out redundant data you could pipe it with grep:

```bash
> tcpdump dst host 87.250.250.29 -vv | grep 'body:' -A 2 -B 2
```
