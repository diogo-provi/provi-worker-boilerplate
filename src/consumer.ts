import { JobCreateResouceSample } from "./jobs";
import getQueueUrl from "./config/configQueue";

class Consumer {
  public async execute() {
    const queueUrl = getQueueUrl();
    const job = new JobCreateResouceSample(queueUrl);
    await job.execute();
  }
}

const init = async () => {
  new Consumer().execute();
};

init();
