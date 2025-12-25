`getImageData` / `putImageData` 工作时用的是 Uint8ClampedArray，每个通道只占 1 个字节，取值范围 0–255（含 255）。

所以：

- 在 ImageData.data 里

  R/G/B/A 全部是 0–255 的整数。

- 在 CSS rgba() 里

  你可以写 `rgba(0 255 0 / 1)`，也可以写 `rgba(0% 100% 0% / 1)`，alpha 用 0–1 的小数。

两者只是“单位”不同，数据类型和范围跟着场景走：

场景	R/G/B/A 范围	类型	
ImageData.data	0–255	整数	
CSS rgba()	0–255 / 0–1	整数 / 小数	

因此  

```js
const changeColor = [0, 255, 0, 255];
```  

就是把 alpha 设成 255（对应 CSS 里的 1），完全合法。