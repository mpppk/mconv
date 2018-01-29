# mconv

Media converter via docker

## Convert wav to mp3

The following command convert `$PWD/*.wav` files to `$PWD/mp3/*.mp3`.

```Shell
$ docker run --rm -it -v $(PWD):/mconv mpppk/mconv
```
