import { Injectable } from '@nestjs/common';

import { getCredential } from 'qcloud-cos-sts';

@Injectable()
export class UploadService {
  private cosConfig = {
    secretId: '你的id', // 固定密钥
    secretKey: '你的key', // 固定密钥
    proxy: '',
    host: 'sts.tencentcloudapi.com', // 域名，非必须，默认为 sts.tencentcloudapi.com
    // endpoint: 'sts.internal.tencentcloudapi.com', // 域名，非必须，与host二选一，默认为 sts.tencentcloudapi.com
    durationSeconds: 1800, // 密钥有效期
    // 放行判断相关参数
    bucket: 'for-qi79-1301392920', // 换成你的 bucket
    region: 'ap-chengdu', // 换成 bucket 所在地区
    allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
    // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
    allowActions: [
      // 简单上传
      'name/cos:PutObject',
      'name/cos:PostObject',
      // 分片上传
      'name/cos:InitiateMultipartUpload',
      'name/cos:ListMultipartUploads',
      'name/cos:ListParts',
      'name/cos:UploadPart',
      'name/cos:CompleteMultipartUpload',
    ],
  };

  private shortBucketName = this.cosConfig.bucket.slice( 0, this.cosConfig.bucket.lastIndexOf('-'));

  private appId = this.cosConfig.bucket.slice( 1 + this.cosConfig.bucket.lastIndexOf('-'), );

  private policy = {
    version: '2.0',
    statement: [
      {
        action: this.cosConfig.allowActions,
        effect: 'allow',
        principal: { qcs: ['*'] },
        resource: [
          'qcs::cos:' +
            this.cosConfig.region +
            ':uid/' +
            this.appId +
            ':prefix//' +
            this.appId +
            '/' +
            this.shortBucketName +
            '/' +
            this.cosConfig.allowPrefix,
        ],
        // condition生效条件，关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
        // 'condition': {
        //   // 比如限定ip访问
        //   'ip_equal': {
        //     'qcs:ip': '10.121.2.10/24'
        //   }
        // }
      },
    ],
  };

  getUploadKey():Promise<string> {

    return new Promise((resolve, reject) => {
      getCredential(
        {
          secretId: this.cosConfig.secretId,
          secretKey: this.cosConfig.secretKey,
          proxy: this.cosConfig.proxy,
          durationSeconds: this.cosConfig.durationSeconds,
          policy: this.policy,
        },
        function (err, tempKeys) {
          var result = JSON.stringify(err || tempKeys) || '';

          resolve(result);
        },
      );
    });
  }
}
