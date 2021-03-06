import * as fs from 'fs';

function configPath(postfix: string) {
    return `${process.env.ZKSYNC_HOME}/etc/test_config/${postfix}`;
}

function loadConfig(path: string) {
    return JSON.parse(
        fs.readFileSync(path, {
            encoding: 'utf-8'
        })
    );
}

export function loadTestConfig() {
    const eipConstantPath = configPath('constant/eip1271.json');
    const eipVolatilePath = configPath('volatile/eip1271.json');

    const eipConstantConfig = loadConfig(eipConstantPath);
    const eipVolatileConfig = loadConfig(eipVolatilePath);
    const eipConfig = Object.assign(eipConstantConfig, eipVolatileConfig);

    const ethConstantPath = configPath('constant/eth.json');
    let ethConfig = loadConfig(ethConstantPath);

    return {
        eip1271: eipConfig,
        eth: ethConfig
    };
}

export function loadTestVectorsConfig() {
    let vectorsConfigPath = configPath('sdk/test-vectors.json');
    return loadConfig(vectorsConfigPath);
}

export function getTokens(network: string) {
    const configPath = `${process.env.ZKSYNC_HOME}/etc/tokens/${network}.json`;
    console.log(configPath);
    return JSON.parse(
        fs.readFileSync(configPath, {
            encoding: 'utf-8'
        })
    );
}
