import { useState } from "react";
import { Database, HardDrive, Wrench, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { SQLCodeBlock } from "@/components/SQLCodeBlock";
import { ExplanationCard } from "@/components/ExplanationCard";
import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { FragmentationIndicator } from "@/components/FragmentationIndicator";

const Index = () => {
  const backupWorkflow = [
    {
      title: "Full Backup",
      description: "Complete database backup",
    },
    {
      title: "Log Backup",
      description: "Transaction log backup",
    },
    {
      title: "Point-in-Time",
      description: "Ready for recovery",
    },
  ];

  const restoreWorkflow = [
    {
      title: "Restore Full",
      description: "NORECOVERY mode",
    },
    {
      title: "Restore Log",
      description: "Apply transaction log",
    },
    {
      title: "Database Online",
      description: "RECOVERY complete",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Database className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              SQL Server DBA Assistant
            </h1>
          </div>
          <p className="text-muted-foreground">
            Interactive learning tool for backup, restore, and index maintenance procedures
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>By Sipo Kupiso • Educational Resource</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="backup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="backup" className="gap-2">
              <HardDrive className="h-4 w-4" />
              Backup
            </TabsTrigger>
            <TabsTrigger value="restore" className="gap-2">
              <Database className="h-4 w-4" />
              Restore
            </TabsTrigger>
            <TabsTrigger value="index" className="gap-2">
              <Wrench className="h-4 w-4" />
              Index Maintenance
            </TabsTrigger>
          </TabsList>

          {/* BACKUP TAB */}
          <TabsContent value="backup" className="space-y-6">
            <Card className="p-6 border-border bg-card">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Database Backup Procedures
              </h2>
              <p className="text-muted-foreground mb-6">
                Learn how to create full and transaction log backups for your SQL Server databases.
              </p>

              <WorkflowTimeline steps={backupWorkflow} />
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Step 1: Full Database Backup
              </h3>
              <SQLCodeBlock
                code={`BACKUP DATABASE [YourDatabaseName]
TO DISK = 'C:\\Backups\\YourDatabaseName_Full.bak'
WITH INIT, 
     FORMAT, 
     NAME = 'Full Backup of YourDatabaseName', 
     SKIP, 
     STATS = 10;
GO`}
              />
              <ExplanationCard title="Understanding Full Backup Options">
                <div className="space-y-2">
                  <p>
                    <strong className="text-foreground">BACKUP DATABASE:</strong> Creates a complete copy of your database
                  </p>
                  <p>
                    <strong className="text-foreground">INIT:</strong> Overwrites any existing backup file
                  </p>
                  <p>
                    <strong className="text-foreground">FORMAT:</strong> Formats the backup media (erases previous backups)
                  </p>
                  <p>
                    <strong className="text-foreground">SKIP:</strong> Skips expiration checking
                  </p>
                  <p>
                    <strong className="text-foreground">STATS = 10:</strong> Shows progress every 10%
                  </p>
                </div>
              </ExplanationCard>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Step 2: Transaction Log Backup
              </h3>
              <SQLCodeBlock
                code={`-- Ensure database is in FULL recovery model
ALTER DATABASE [YourDatabaseName] SET RECOVERY FULL;
GO

BACKUP LOG [YourDatabaseName]
TO DISK = 'C:\\Backups\\YourDatabaseName_Log.trn'
WITH INIT, 
     NAME = 'Transaction Log Backup of YourDatabaseName', 
     SKIP, 
     STATS = 10;
GO`}
              />
              <ExplanationCard title="Why Transaction Log Backups Matter">
                <div className="space-y-2">
                  <p>
                    Transaction log backups allow point-in-time recovery and prevent log file growth.
                  </p>
                  <p>
                    <strong className="text-foreground">Requirements:</strong> Database must be in FULL recovery model
                  </p>
                  <p>
                    <strong className="text-foreground">Best Practice:</strong> Schedule regular log backups (hourly or more frequently)
                  </p>
                </div>
              </ExplanationCard>
            </div>

            <Card className="p-6 border-info/30 bg-info/5">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-info" />
                Best Practices
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Always test your backups by performing test restores</li>
                <li>• Store backups on a different physical drive than your database</li>
                <li>• Implement a backup rotation strategy (daily, weekly, monthly)</li>
                <li>• Monitor backup completion and failures</li>
                <li>• Document your backup procedures</li>
              </ul>
            </Card>
          </TabsContent>

          {/* RESTORE TAB */}
          <TabsContent value="restore" className="space-y-6">
            <Card className="p-6 border-border bg-card">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Database Restore Procedures
              </h2>
              <p className="text-muted-foreground mb-6">
                Restore your database from full and transaction log backups.
              </p>

              <WorkflowTimeline steps={restoreWorkflow} />
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Pre-Restore: Check Backup Contents
              </h3>
              <SQLCodeBlock
                code={`-- View logical file names in backup
RESTORE FILELISTONLY 
FROM DISK = 'C:\\Backups\\YourDatabaseName_Full.bak';
GO`}
              />
              <ExplanationCard title="Why Check File List First?">
                <p>
                  Use RESTORE FILELISTONLY to identify the logical names of your database files.
                  You'll need these names for the MOVE option in the restore command.
                </p>
              </ExplanationCard>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Step 1: Restore Full Backup (NORECOVERY)
              </h3>
              <SQLCodeBlock
                code={`RESTORE DATABASE [YourDatabaseName]
FROM DISK = 'C:\\Backups\\YourDatabaseName_Full.bak'
WITH NORECOVERY, 
     MOVE 'YourDatabaseName' TO 'C:\\Data\\YourDatabaseName.mdf',
     MOVE 'YourDatabaseName_log' TO 'C:\\Data\\YourDatabaseName.ldf',
     STATS = 10;
GO`}
              />
              <ExplanationCard title="Understanding NORECOVERY Mode">
                <div className="space-y-2">
                  <p>
                    <strong className="text-foreground">NORECOVERY:</strong> Leaves the database in a restoring state,
                    allowing you to apply transaction log backups
                  </p>
                  <p>
                    <strong className="text-foreground">MOVE:</strong> Relocates database files to new paths
                    (useful when restoring to a different server)
                  </p>
                  <p>
                    <strong className="text-foreground">Important:</strong> Database is NOT accessible until you
                    complete the restore sequence with RECOVERY
                  </p>
                </div>
              </ExplanationCard>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Step 2: Restore Transaction Log (RECOVERY)
              </h3>
              <SQLCodeBlock
                code={`RESTORE LOG [YourDatabaseName]
FROM DISK = 'C:\\Backups\\YourDatabaseName_Log.trn'
WITH RECOVERY, 
     STATS = 10;
GO

-- ✅ Database is now online and ready to use`}
              />
              <ExplanationCard title="Final Recovery Step">
                <div className="space-y-2">
                  <p>
                    <strong className="text-foreground">RECOVERY:</strong> Brings the database online
                    by rolling forward committed transactions and rolling back uncommitted ones
                  </p>
                  <p>
                    <strong className="text-foreground">Point-in-Time:</strong> You can restore to a specific
                    time using: WITH STOPAT = '2024-01-01 14:30:00'
                  </p>
                </div>
              </ExplanationCard>
            </div>

            <Card className="p-6 border-warning/30 bg-warning/5">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-warning" />
                Recovery Model Requirements
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Database must be in FULL recovery model for log backups</li>
                <li>• Simple recovery model does not support log backups</li>
                <li>• After restoring, verify database state with: SELECT name, state_desc FROM sys.databases</li>
                <li>• Test your restore procedures regularly in non-production environments</li>
              </ul>
            </Card>
          </TabsContent>

          {/* INDEX MAINTENANCE TAB */}
          <TabsContent value="index" className="space-y-6">
            <Card className="p-6 border-border bg-card">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Index Fragmentation & Maintenance
              </h2>
              <p className="text-muted-foreground mb-6">
                Identify fragmented indexes and apply appropriate maintenance strategies.
              </p>

              <FragmentationIndicator />
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Step 1: Check Index Fragmentation
              </h3>
              <SQLCodeBlock
                code={`SELECT 
    DB_NAME() AS DatabaseName,
    OBJECT_NAME(ips.OBJECT_ID) AS TableName,
    i.name AS IndexName,
    ips.index_type_desc,
    ips.avg_fragmentation_in_percent,
    ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i 
    ON ips.object_id = i.object_id 
   AND ips.index_id = i.index_id
WHERE ips.avg_fragmentation_in_percent > 10
  AND ips.page_count > 100
ORDER BY ips.avg_fragmentation_in_percent DESC;
GO`}
              />
              <ExplanationCard title="Understanding Index Fragmentation">
                <div className="space-y-2">
                  <p>
                    <strong className="text-foreground">DMV Query:</strong> Uses sys.dm_db_index_physical_stats
                    to analyze index fragmentation levels
                  </p>
                  <p>
                    <strong className="text-foreground">page_count {'>'} 100:</strong> Filters out very small indexes
                    where fragmentation doesn't significantly impact performance
                  </p>
                  <p>
                    <strong className="text-foreground">LIMITED mode:</strong> Faster scan that's sufficient
                    for routine checks
                  </p>
                </div>
              </ExplanationCard>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Step 2: Generate REBUILD Commands (30%+ Fragmentation)
              </h3>
              <SQLCodeBlock
                code={`SELECT 
    'ALTER INDEX [' + i.name + '] ON [' + OBJECT_NAME(i.object_id) + '] REBUILD WITH (ONLINE = ON);' AS RebuildCommand
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i 
    ON ips.object_id = i.object_id 
   AND ips.index_id = i.index_id
WHERE ips.avg_fragmentation_in_percent > 30
  AND ips.page_count > 100
  AND i.type_desc <> 'HEAP';
GO`}
              />
              <ExplanationCard title="When to REBUILD">
                <div className="space-y-2">
                  <p>
                    <strong className="text-foreground">High Fragmentation:</strong> REBUILD is recommended
                    when fragmentation exceeds 30%
                  </p>
                  <p>
                    <strong className="text-foreground">ONLINE = ON:</strong> Allows concurrent access
                    during rebuild (Enterprise Edition feature)
                  </p>
                  <p>
                    <strong className="text-foreground">Note:</strong> REBUILD is more resource-intensive
                    but completely rebuilds the index structure
                  </p>
                </div>
              </ExplanationCard>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Step 3: Generate REORGANIZE Commands (10-30% Fragmentation)
              </h3>
              <SQLCodeBlock
                code={`SELECT 
    'ALTER INDEX [' + i.name + '] ON [' + OBJECT_NAME(i.object_id) + '] REORGANIZE;' AS ReorganizeCommand
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i 
    ON ips.object_id = i.object_id 
   AND ips.index_id = i.index_id
WHERE ips.avg_fragmentation_in_percent BETWEEN 10 AND 30
  AND ips.page_count > 100
  AND i.type_desc <> 'HEAP';
GO`}
              />
              <ExplanationCard title="When to REORGANIZE">
                <div className="space-y-2">
                  <p>
                    <strong className="text-foreground">Moderate Fragmentation:</strong> REORGANIZE is
                    efficient for fragmentation between 10-30%
                  </p>
                  <p>
                    <strong className="text-foreground">Online Operation:</strong> REORGANIZE is always
                    online and less resource-intensive
                  </p>
                  <p>
                    <strong className="text-foreground">Compact Pages:</strong> Defragments leaf level
                    pages and compacts them
                  </p>
                </div>
              </ExplanationCard>
            </div>

            <Card className="p-6 border-success/30 bg-success/5">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-success" />
                Index Maintenance Best Practices
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Schedule index maintenance during maintenance windows</li>
                <li>• Use REORGANIZE for moderate fragmentation (less resource intensive)</li>
                <li>• Use REBUILD for high fragmentation (complete index rebuild)</li>
                <li>• Monitor index usage with sys.dm_db_index_usage_stats</li>
                <li>• Consider disabling unused indexes instead of maintaining them</li>
                <li>• Update statistics after rebuild/reorganize operations</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <Card className="p-6 bg-secondary/30">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Educational Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground">
              This application is designed for educational and learning purposes.
              Always test procedures in a non-production environment first.
              Consult your organization's policies and backup/recovery procedures
              before performing database operations in production.
            </p>
          </Card>
        </footer>
      </main>
    </div>
  );
};

export default Index;
